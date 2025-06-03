import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import type { Order } from "../types/types"; // Replace with actual path
// Replace with actual path

interface OrderEditModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onSave: (order: Order) => void;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({
  open,
  order,
  onClose,
  onSave,
}) => {
  const [editedOrder, setEditedOrder] = React.useState<Order | null>(order);

  React.useEffect(() => {
    setEditedOrder(order);
  }, [order]);

  const handleSave = () => {
    if (editedOrder) {
      onSave(editedOrder);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order: {editedOrder?.id}</DialogTitle>
        </DialogHeader>

        {editedOrder && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={editedOrder.status}
                onValueChange={(value: any) =>
                  setEditedOrder((prev) =>
                    prev ? { ...prev, status: value as Order["status"] } : prev
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PREPARING">Preparing</SelectItem>
                  <SelectItem value="READY">Ready</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Type</label>
              <Select
                value={editedOrder.type}
                onValueChange={(value) =>
                  setEditedOrder((prev) =>
                    prev ? { ...prev, type: value as Order["type"] } : prev
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DINE IN">Dine In</SelectItem>
                  <SelectItem value="TAKE AWAY">Take Away</SelectItem>
                  <SelectItem value="DELIVERY">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button onClick={onClose} className="bg-gray-100 p-2 rounded-sm">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 p-2 rounded-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderEditModal;
