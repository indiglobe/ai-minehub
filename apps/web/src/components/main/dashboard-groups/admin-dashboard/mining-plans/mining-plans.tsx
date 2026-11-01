import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useForm } from "@tanstack/react-form";
import { cn } from "@repo/styles/cn";
import {
  Layers,
  Plus,
  Edit,
  Trash,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import {
  MiningPlansError,
  MiningPlansLoading,
} from "@/components/main/dashboard-groups/admin-dashboard/mining-plans/boundary-comps";
import { useRouter } from "@tanstack/react-router";
import {
  useCreateMiningProfile,
  useDeleteMiningProfile,
  useReadAllMiningProfiles,
  useUpdateMiningProfile,
} from "@/integrations/tanstack/react-querry/mining-profile";

type MiningProfile = {
  id: string;
  category: string;
  dailyReturn: number | null;
  lockinPeriod: number;
  minimumAllowedAmount: number;
  maximumAllowedAmount: number;
  isPopular: boolean;
};

type MiningProfileFormValues = {
  category: string;
  dailyReturn: number;
  lockinPeriod: number;
  minimumAllowedAmount: number;
  maximumAllowedAmount: number;
  isPopular: boolean;
};

const defaultValues: MiningProfileFormValues = {
  category: "",
  dailyReturn: 0,
  lockinPeriod: 30,
  minimumAllowedAmount: 100,
  maximumAllowedAmount: 1000,
  isPopular: false,
};

function MiningProfileFormFields({ form }: { form: any }) {
  return (
    <div className="space-y-5">
      <form.Field
        name="category"
        validators={{
          onChange: ({ value }: { value: string }) =>
            value.trim().length === 0
              ? "Plan name is required"
              : value.length > 50
                ? "Plan name cannot exceed 50 characters"
                : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <label
              htmlFor={field.name}
              className="text-foreground/70 text-xs font-medium"
            >
              Plan Name
            </label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="e.g. Advanced"
              maxLength={50}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-xs text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="dailyReturn"
          validators={{
            onChange: ({ value }: { value: number }) =>
              !Number.isFinite(value) || value < 0
                ? "Daily return must be a non-negative number"
                : undefined,
          }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-foreground/70 text-xs font-medium"
              >
                Daily Return (%)
              </label>
              <div className="relative">
                <TrendingUp className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id={field.name}
                  type="number"
                  min="0"
                  step="0.01"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  className="pl-9"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="lockinPeriod"
          validators={{
            onChange: ({ value }: { value: number }) =>
              !Number.isInteger(value) || value <= 0
                ? "Duration must be a positive whole number"
                : undefined,
          }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-foreground/70 text-xs font-medium"
              >
                Duration (Days)
              </label>
              <div className="relative">
                <Clock className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id={field.name}
                  type="number"
                  min="1"
                  step="1"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  className="pl-9"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="minimumAllowedAmount"
          validators={{
            onChange: ({ value }: { value: number }) =>
              !Number.isInteger(value) || value <= 0
                ? "Minimum deposit must be a positive whole number"
                : undefined,
          }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-foreground/70 text-xs font-medium"
              >
                Minimum Deposit ($)
              </label>
              <div className="relative">
                <DollarSign className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id={field.name}
                  type="number"
                  min="1"
                  step="1"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  className="pl-9"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="maximumAllowedAmount"
          validators={{
            onChange: ({ value }: { value: number }) =>
              !Number.isInteger(value) || value <= 0
                ? "Maximum deposit must be a positive whole number"
                : undefined,
            onChangeListenTo: ["minimumAllowedAmount"],
          }}
        >
          {(field: any) => (
            <div className="space-y-2">
              <label
                htmlFor={field.name}
                className="text-foreground/70 text-xs font-medium"
              >
                Maximum Deposit ($)
              </label>
              <div className="relative">
                <DollarSign className="text-foreground/40 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id={field.name}
                  type="number"
                  min="1"
                  step="1"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  className="pl-9"
                  aria-invalid={field.state.meta.errors.length > 0}
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="isPopular">
        {(field: any) => (
          <label className="border-foreground/10 bg-foreground/2.5 hover:bg-foreground/5 flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition-colors">
            <div className="space-y-1">
              <span className="text-foreground text-sm font-medium">
                Popular Plan
              </span>
              <p className="text-foreground/50 text-xs">
                Highlight this plan as a popular choice.
              </p>
            </div>

            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(event) => field.handleChange(event.target.checked)}
              className="accent-primary-500 size-4 shrink-0"
            />
          </label>
        )}
      </form.Field>
    </div>
  );
}

function MiningProfileFormDialog({
  open,
  onOpenChange,
  title,
  description,
  form,
  submitLabel,
  submittingLabel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  form: any;
  submitLabel: string;
  submittingLabel: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-xl">
        <div className="p-5 sm:p-6">
          <DialogHeader className="mb-6">
            <div className="bg-primary-500/10 text-primary-500 mb-3 flex size-10 items-center justify-center rounded-lg">
              <Layers className="size-5" />
            </div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <MiningProfileFormFields form={form} />

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              <form.Subscribe
                selector={(state: any) => [state.isSubmitting] as const}
              >
                {([isSubmitting]: [boolean]) => (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? submittingLabel : submitLabel}
                  </Button>
                )}
              </form.Subscribe>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MiningPlans({
  className,
  ...props
}: ComponentProps<"section">) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<MiningProfile | null>(
    null,
  );

  const {
    data: allMiningProfiles,
    isLoading: isAllMiningProfilesLoading,
    isError: isAllMiningProfilesError,
  } = useReadAllMiningProfiles();

  const { mutateAsync: createMiningProfile } = useCreateMiningProfile();
  const { mutateAsync: updateMiningProfile } = useUpdateMiningProfile();
  const { mutateAsync: deleteMiningProfile } = useDeleteMiningProfile();

  const router = useRouter();

  const createForm = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await createMiningProfile({
        data: {
          dataToInsert: value,
        },
      });

      setIsModalOpen(false);
      createForm.reset();
      await router.invalidate();
    },
  });

  const updateForm = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!selectedProfile) return;

      await updateMiningProfile({
        data: {
          identifier: { id: selectedProfile.id },
          dataToUpdate: value,
        },
      });

      setSelectedProfile(null);
      await router.invalidate();
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      createForm.reset();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedProfile) {
      updateForm.reset({
        category: selectedProfile.category,
        dailyReturn: selectedProfile.dailyReturn ?? 0,
        lockinPeriod: selectedProfile.lockinPeriod,
        minimumAllowedAmount: selectedProfile.minimumAllowedAmount,
        maximumAllowedAmount: selectedProfile.maximumAllowedAmount,
        isPopular: selectedProfile.isPopular,
      });
    }
  }, [selectedProfile]);

  const handleDelete = async (plan: MiningProfile) => {
    await deleteMiningProfile({
      data: {
        identifier: { id: plan.id },
      },
    });

    await router.invalidate();
  };

  return (
    <section
      className={cn("default-padding @container py-10", className)}
      {...props}
    >
      <div className="border-secondary-500/20 bg-secondary-500/5 overflow-hidden rounded-2xl border">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500/10 text-primary-500 flex size-9 items-center justify-center rounded-lg">
              <Layers className="size-4" />
            </div>

            <div>
              <h2 className="font-brand-secondary text-sm font-semibold">
                Mining Plans
              </h2>
              <p className="text-foreground/50 mt-0.5 text-xs">
                Manage your available mining plans
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="gap-1.5"
          >
            <Plus className="size-3.5" />
            Add New Mining Plan
          </Button>
        </div>

        <div className="border-foreground/10 border-t" />

        {allMiningProfiles && (
          <div className="overflow-x-auto px-5 sm:px-6">
            <table className="w-full min-w-190 border-collapse text-left">
              <thead>
                <tr className="text-foreground/50 text-xs tracking-wider uppercase">
                  <th className="py-4 pr-4 font-medium">Plan Name</th>
                  <th className="py-4 pr-4 font-medium">Daily Return</th>
                  <th className="py-4 pr-4 font-medium">Duration</th>
                  <th className="py-4 pr-4 font-medium">Min Deposit</th>
                  <th className="py-4 pr-4 font-medium">Max Deposit</th>
                  <th className="py-4 pr-4 font-medium">Total Return</th>
                  <th className="py-4 pr-4 font-medium">Popularity</th>
                  <th className="py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-foreground/10 divide-y text-sm">
                {allMiningProfiles.map((plan) => (
                  <tr
                    key={plan.id}
                    className="group hover:bg-foreground/2.5 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <span className="text-foreground font-semibold">
                        {plan.category}
                      </span>
                    </td>

                    <td className="py-4 pr-4">
                      <span className="font-semibold text-green-500">
                        {plan.dailyReturn}%
                      </span>
                    </td>

                    <td className="text-foreground/70 py-4 pr-4 text-xs">
                      {plan.lockinPeriod} days
                    </td>

                    <td className="text-foreground/70 py-4 pr-4">
                      ${plan.minimumAllowedAmount.toLocaleString()}
                    </td>

                    <td className="text-foreground/70 py-4 pr-4">
                      ${plan.maximumAllowedAmount.toLocaleString()}
                    </td>

                    <td className="py-4 pr-4">
                      <span className="text-primary-400 font-semibold">
                        {Math.round(
                          (plan.dailyReturn ?? 0) * plan.lockinPeriod,
                        )}
                        %
                      </span>
                    </td>

                    <td className="py-4 pr-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                          plan.isPopular
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                            : "border-foreground/10 bg-foreground/5 text-foreground/50",
                        )}
                      >
                        {plan.isPopular ? "Popular" : "Standard"}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedProfile(plan)}
                          className="h-8 gap-1.5 px-3 text-xs"
                        >
                          <Edit className="size-3.5" />
                          Edit
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => void handleDelete(plan)}
                          className="h-8 gap-1.5 px-3 text-xs"
                        >
                          <Trash className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {allMiningProfiles.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-14 text-center">
                      <div className="mx-auto flex max-w-xs flex-col items-center">
                        <div className="bg-foreground/5 text-foreground/40 mb-3 flex size-11 items-center justify-center rounded-full">
                          <Layers className="size-5" />
                        </div>
                        <p className="text-foreground text-sm font-medium">
                          No mining plans yet
                        </p>
                        <p className="text-foreground/50 mt-1 text-xs">
                          Create your first mining plan to get started.
                        </p>
                        <Button
                          size="sm"
                          onClick={() => setIsModalOpen(true)}
                          className="mt-4 gap-1.5"
                        >
                          <Plus className="size-3.5" />
                          Create Plan
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {isAllMiningProfilesError && <MiningPlansError />}
        {isAllMiningProfilesLoading && <MiningPlansLoading />}
      </div>

      <MiningProfileFormDialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Create Mining Plan"
        description="Configure the details and earning parameters for your new mining plan."
        form={createForm}
        submitLabel="Create Plan"
        submittingLabel="Creating..."
      />

      <MiningProfileFormDialog
        open={Boolean(selectedProfile)}
        onOpenChange={(open) => {
          if (!open) setSelectedProfile(null);
        }}
        title="Update Mining Plan"
        description="Modify the details and earning parameters of this mining plan."
        form={updateForm}
        submitLabel="Save Changes"
        submittingLabel="Updating..."
      />
    </section>
  );
}
