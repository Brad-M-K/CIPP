import { Box } from "@mui/material";
import CippFormPage from "../../../../components/CippFormPages/CippFormPage";
import { Layout as DashboardLayout } from "../../../../layouts/index.js";
import { useForm, useWatch } from "react-hook-form";
import CippFormComponent from "../../../../components/CippComponents/CippFormComponent";
import { useSettings } from "../../../../hooks/use-settings";
import { Grid } from "@mui/system";
import { CippPropertyListCard } from "../../../../components/CippCards/CippPropertyListCard";
import { getCippFormatting } from "../../../../utils/get-cipp-formatting";
import { getCippTranslation } from "../../../../utils/get-cipp-translation";

const Page = () => {
  const userSettingsDefaults = useSettings();
  const tenantDomain = userSettingsDefaults?.currentTenant;

  const formControl = useForm({
    mode: "onChange",
    defaultValues: {
      tenantFilter: tenantDomain,
      action: "NewSub",
      iagree: false,
    },
  });

  const selectedProduct = useWatch({
    control: formControl.control,
    name: "ProductId",
  });

  return (
    <>
      <CippFormPage
        queryKey={"CippFormPage"}
        formControl={formControl}
        title="Add Infinigate Subscription"
        backButtonTitle="Infinigate Licenses"
        postUrl="/api/ExecInfinigateLicense"
      >
        <Box sx={{ my: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <CippFormComponent
                type="autoComplete"
                creatable={false}
                label={`Available Products for ${tenantDomain}`}
                name="ProductId"
                api={{
                  queryKey: `InfinigateSKU-${tenantDomain}`,
                  url: "/api/ListInfinigateSku",
                  labelField: (option) => `${option?.productName ?? option?.name} (${option?.id})`,
                  valueField: "id",
                  addedField: {
                    productName: "productName",
                    description: "description",
                    status: "status",
                  },
                }}
                multiple={false}
                formControl={formControl}
                required={true}
                validators={{
                  validate: (option) => {
                    return option?.value ? true : "This field is required.";
                  },
                }}
                sortOptions={true}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <CippFormComponent
                type="number"
                label="Quantity of licenses to purchase."
                name="Quantity"
                formControl={formControl}
                validators={{
                  required: "This field is required.",
                  min: {
                    value: 1,
                    message: "Minimum value is 1.",
                  },
                }}
                required={true}
              />
            </Grid>
            {selectedProduct?.value && (
              <Grid size={{ xs: 12 }}>
                <CippPropertyListCard
                  title="Selected Product Details"
                  variant="outlined"
                  showDivider={false}
                  propertyItems={[
                    { label: "Name", value: selectedProduct?.label },
                    {
                      label: "Status",
                      value: getCippTranslation(selectedProduct?.addedFields?.status),
                    },
                    {
                      label: "Description",
                      value: getCippFormatting(
                        selectedProduct?.addedFields?.description,
                        "text"
                      ),
                    },
                  ]}
                />
              </Grid>
            )}
            <Grid size={{ xs: 12 }}>
              <CippFormComponent
                type="checkbox"
                label="I understand that by pressing submit this subscription will be purchased according to the terms and conditions with Infinigate."
                name="iagree"
                formControl={formControl}
                validators={{
                  required: "This field is required.",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </CippFormPage>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
