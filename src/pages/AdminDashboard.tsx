import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle, LogOut, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Associate {
  user_id: string;
  salon_name: string | null;
  owner_name: string | null;
  mobile: string | null;
  city: string | null;
  address: string | null;
  services: string | null;
  is_active: boolean;
  created_at: string;
}

interface Subscription {
  user_id: string;
  status: string;
  start_date: string;
  end_date: string;
  membership_plans: {
    name: string;
    price: number;
  };
}

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [associates, setAssociates] = useState<Associate[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [assocRes, subsRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*, membership_plans(name, price)"),
    ]);

    if (assocRes.data) setAssociates(assocRes.data as Associate[]);
    if (subsRes.data) setSubscriptions(subsRes.data as unknown as Subscription[]);
    setLoading(false);
  };

  const toggleActive = async (userId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_active: !currentStatus })
      .eq("user_id", userId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Associate ${!currentStatus ? "activated" : "deactivated"}`);
      fetchData();
    }
  };

  const getSubscription = (userId: string) => {
    return subscriptions.find((s) => s.user_id === userId);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="font-body text-muted-foreground mt-1">Manage associates and subscriptions</p>
          </div>
          <Button onClick={signOut} variant="outline" className="font-body w-fit">
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-body text-sm text-muted-foreground">Total Associates</p>
            <p className="font-display text-3xl font-bold text-foreground">{associates.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-body text-sm text-muted-foreground">Active</p>
            <p className="font-display text-3xl font-bold text-green-600">
              {associates.filter((a) => a.is_active).length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-body text-sm text-muted-foreground">Subscriptions</p>
            <p className="font-display text-3xl font-bold text-primary">{subscriptions.length}</p>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedAssociate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
            <div className="bg-background rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Associate Details</h2>
              <div className="space-y-3">
                <DetailRow label="Salon Name" value={selectedAssociate.salon_name} />
                <DetailRow label="Owner Name" value={selectedAssociate.owner_name} />
                <DetailRow label="Mobile" value={selectedAssociate.mobile} />
                <DetailRow label="City" value={selectedAssociate.city} />
                <DetailRow label="Address" value={selectedAssociate.address} />
                <DetailRow label="Services" value={selectedAssociate.services} />
                <DetailRow
                  label="Status"
                  value={selectedAssociate.is_active ? "Active" : "Inactive"}
                />
                <DetailRow
                  label="Joined"
                  value={new Date(selectedAssociate.created_at).toLocaleDateString("en-IN")}
                />
              </div>
              <Button
                variant="outline"
                className="mt-6 w-full font-body"
                onClick={() => setSelectedAssociate(null)}
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Associates Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <Users size={20} className="text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">All Associates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-accent">
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground">Salon</th>
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground">Owner</th>
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground hidden md:table-cell">City</th>
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground hidden md:table-cell">Mobile</th>
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground">Plan</th>
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-body text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {associates.map((associate) => {
                  const sub = getSubscription(associate.user_id);
                  return (
                    <tr key={associate.user_id} className="border-b border-border last:border-0 hover:bg-accent/50">
                      <td className="p-4 font-body text-sm text-foreground">
                        {associate.salon_name || "—"}
                      </td>
                      <td className="p-4 font-body text-sm text-foreground">
                        {associate.owner_name || "—"}
                      </td>
                      <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">
                        {associate.city || "—"}
                      </td>
                      <td className="p-4 font-body text-sm text-muted-foreground hidden md:table-cell">
                        {associate.mobile || "—"}
                      </td>
                      <td className="p-4">
                        {sub ? (
                          <span className="text-xs font-body bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {sub.membership_plans.name}
                          </span>
                        ) : (
                          <span className="text-xs font-body text-muted-foreground">None</span>
                        )}
                      </td>
                      <td className="p-4">
                        {associate.is_active ? (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-body">
                            <CheckCircle size={14} /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-destructive text-xs font-body">
                            <XCircle size={14} /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedAssociate(associate)}
                            className="p-1.5 hover:bg-accent rounded text-muted-foreground hover:text-foreground"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => toggleActive(associate.user_id, associate.is_active)}
                            className={`text-xs font-body px-2 py-1 rounded ${
                              associate.is_active
                                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {associate.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {associates.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center font-body text-muted-foreground">
                      No associates registered yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex justify-between py-2 border-b border-border last:border-0">
    <span className="font-body text-sm text-muted-foreground">{label}</span>
    <span className="font-body text-sm font-medium text-foreground text-right">{value || "—"}</span>
  </div>
);

export default AdminDashboard;
