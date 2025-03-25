import React from 'react';
import { Booking } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PORTS, TIME_SLOTS } from '@/utils/data';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { Trans } from '@lingui/macro';

interface EditBookingFormProps {
  booking: Booking;
  onSave: (booking: Booking) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  cargoType: z.string().min(1, 'Cargo type is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  vehicleNumber: z.string().optional(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactPhone: z.string().min(1, 'Contact phone is required'),
  notes: z.string().optional(),
  portId: z.string().min(1, 'Port is required'),
});

const EditBookingForm: React.FC<EditBookingFormProps> = ({ booking, onSave, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: booking.company,
      cargoType: booking.cargoType,
      vehicleType: booking.vehicleType,
      vehicleNumber: booking.vehicleNumber || '',
      startTime: booking.startTime,
      endTime: booking.endTime,
      contactName: booking.contactName,
      contactPhone: booking.contactPhone,
      notes: booking.notes || '',
      portId: booking.portId,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedBooking: Booking = {
      ...booking,
      ...values,
    };
    
    if (values.startTime >= values.endTime) {
      toast.error('End time must be after start time');
      return;
    }
    
    onSave(updatedBooking);
    toast.success('Booking updated successfully');
  };

  return (
    <div>
      <DialogHeader className="pb-4">
        <DialogTitle><Trans>Edit Booking</Trans></DialogTitle>
        <DialogDescription>
          <Trans>Update the booking information below.</Trans>
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Company</Trans></FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Bay</Trans></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bay" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PORTS.map((port) => (
                        <SelectItem key={port.id} value={port.id}>
                          {port.name} - {port.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Start Time</Trans></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>End Time</Trans></FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cargoType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Cargo Type</Trans></FormLabel>
                  <FormControl>
                    <Input placeholder="Cargo type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Vehicle Type</Trans></FormLabel>
                  <FormControl>
                    <Input placeholder="Vehicle type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="vehicleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Vehicle number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Contact Name</Trans></FormLabel>
                  <FormControl>
                    <Input placeholder="Contact name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><Trans>Contact Phone</Trans></FormLabel>
                  <FormControl>
                    <Input placeholder="Contact phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional notes about the booking"
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              <Trans>Cancel</Trans>
            </Button>
            <Button 
              type="submit"
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              <Trans>Save Changes</Trans>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditBookingForm;
