import { Layout as DashboardLayout } from "../../../../layouts/index.js";
import { CippTablePage } from "../../../../components/CippComponents/CippTablePage.jsx";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DeleteForever, ShoppingCart } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

const Page = () => {
  const pageTitle = "Infinigate Licences Report";
  const apiUrl = "/api/ListInfinigateLicenses";

  const actions = [
    {
      label: "Increase licence count by 1",
      type: "POST",
      icon: <PlusIcon />,
      url: "/api/ExecInfinigateLicense",
      data: { Action: "!Add", ProductId: "id", add: 1 },
      confirmText: "Are you sure you want to buy 1 extra licence?",
      multiPost: false,
    },
    {
      label: "Decrease licence count by 1",
      type: "POST",
      icon: <MinusIcon />,
      url: "/api/ExecInfinigateLicense",
      data: { Action: "!Remove", ProductId: "id", Remove: 1 },
      confirmText: "Are you sure you want to decrease the licence count by 1?",
      multiPost: false,
    },
    {
      label: "Increase licence count",
      type: "POST",
      icon: <PlusIcon />,
      url: "/api/ExecInfinigateLicense",
      data: { Action: "!Add", ProductId: "id" },
      fields: [
        {
          type: "textField",
          name: "add",
          label: "The number of licences to add",
          multiple: false,
        },
      ],
      confirmText: "Enter the amount of licences to buy, and press confirm.",
      multiPost: false,
    },
    {
      label: "Decrease licence count",
      type: "POST",
      icon: <MinusIcon />,
      url: "/api/ExecInfinigateLicense",
      fields: [
        {
          type: "textField",
          name: "remove",
          label: "Licences",
          multiple: false,
        },
      ],
      data: { Action: "!Remove", ProductId: "id" },
      confirmText: "Enter the number of licences to remove. This must be a number greater than 0.",
      multiPost: false,
    },
    {
      label: "Cancel Subscription",
      type: "POST",
      icon: <DeleteForever />,
      url: "/api/ExecInfinigateLicense",
      data: { Action: "!Cancel", SubscriptionIds: "id" },
      confirmText: "Are you sure you want to cancel this entire subscription?",
      multiPost: false,
    },
  ];

  const offCanvas = null;

  const simpleColumns = [
    "productName",
    "id",
    "status",
    "quantity",
  ];

  return (
    <CippTablePage
      title={pageTitle}
      apiUrl={apiUrl}
      actions={actions}
      offCanvas={offCanvas}
      simpleColumns={simpleColumns}
      cardButton={
        <>
          <Button component={Link} href="/tenant/administration/add-infinigate-subscription" startIcon={<ShoppingCart />}>
            Add Subscription
          </Button>
        </>
      }
    />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
