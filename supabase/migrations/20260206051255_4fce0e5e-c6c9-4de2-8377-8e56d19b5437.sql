
-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'associate');

-- Create enum for plan types
CREATE TYPE public.plan_type AS ENUM ('monthly', 'growth');

-- Create enum for subscription status
CREATE TYPE public.subscription_status AS ENUM ('active', 'inactive', 'expired');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  salon_name TEXT,
  owner_name TEXT,
  mobile TEXT,
  city TEXT,
  address TEXT,
  services TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Membership plans table
CREATE TABLE public.membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan_type plan_type NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  duration_months INTEGER NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.membership_plans(id),
  status subscription_status NOT NULL DEFAULT 'active',
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Marketing templates table
CREATE TABLE public.marketing_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  template_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.marketing_templates ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Auto-create profile and assign associate role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id) VALUES (NEW.id);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'associate');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for membership_plans (public read)
CREATE POLICY "Anyone can view plans"
  ON public.membership_plans FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage plans"
  ON public.membership_plans FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON public.subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all subscriptions"
  ON public.subscriptions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for marketing_templates (authenticated users can read)
CREATE POLICY "Authenticated users can view templates"
  ON public.marketing_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage templates"
  ON public.marketing_templates FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed membership plans
INSERT INTO public.membership_plans (name, plan_type, price, duration_months, features)
VALUES 
  ('Monthly Membership Plan', 'monthly', 999, 1, '["Digital marketing for your salon", "Listing on company platform", "Lead generation support", "Access to dashboard", "10 social media post templates per month"]'),
  ('Growth Plan', 'growth', 999, 2, '["Lead generation for salon customers", "Digital marketing campaigns for your salon", "Membership access", "10 social media templates per month", "Promotion support"]');
