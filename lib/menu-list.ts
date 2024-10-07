import {
  Tag,
  BarChart,
  Link,
  ClipboardMinus,
  SquarePen,
  Printer,
  Shield,
  LayoutGrid,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  value: string;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  value: string;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
          value: "1",
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Link Generation",
          active: pathname.includes("/heloj"),
          icon: Link,
          value: "2",
          submenus: [
            // {
            //   href: "/company-master",
            //   label: "Company Master",
            //   active: pathname === "/company-master",
            //   value: "2_1",
            // },
            // {
            //   href: "/plant-master",
            //   label: "Plant Master",
            //   active: pathname === "/plant-master",
            //   value: "2_2",
            // },
            // {
            //   href: "/uom-master",
            //   label: "UOM Master",
            //   active: pathname === "/uom-master",
            //   value: "2_8",
            // },
            // {
            //   href: "/warehouse-category-master",
            //   label: "WH Category Master",
            //   active: pathname === "/warehouse-category-master",
            //   value: "2_3",
            // },
            // {
            //   href: "/warehouse-master",
            //   label: "Warehouse Master",
            //   active: pathname === "/warehouse-master",
            //   value: "2_4",
            // },
            // {
            //   href: "/warehouse-location-master",
            //   label: "WH Location Master",
            //   active: pathname === "/warehouse-location-master",
            //   value: "2_5",
            // },
            // {
            //   href: "/material-master",
            //   label: "Material Master",
            //   active: pathname === "/material-master",
            //   value: "2_6",
            // },
            // {
            //   href: "/line-master",
            //   label: "Line Master",
            //   active: pathname === "/line-master",
            //   value: "2_7",
            // },
          ],
        },
     
        {
          href: "/categories",
          label: "Report",
          active: pathname.includes("/categories"),
          icon: ClipboardMinus,
          value: "5",
          submenus: [
            {
              href: "/gate-inward-details",
              label: "Gate Inward Details",
              active: pathname === "/gate-inward-details",
              value: "5_1",
            },
            {
              href: "/rep-gate-entry-reversal",
              label: "Gate Inward Reversal",
              active: pathname === "/rep-gate-entry-reversal",
              value: "5_2",
            },
            {
              href: "/rep-create-grn",
              label: "Create GRN Data",
              active: pathname === "/rep-create-grn",
              value: "5_3",
            },
            {
              href: "/rep-create-grn-details",
              label: "Create GRN Details",
              active: pathname === "/rep-create-grn-details",
              value: "5_8",
            },
            {
              href: "/rep-rm-printing",
              label: "RM Label Print Data",
              active: pathname === "/rep-rm-printing",
              value: "5_4",
            },
            {
              href: "/rep-qc-details",
              label: "QC Detials",
              active: pathname === "/rep-qc-details",
              value: "5_9",
            },
            {
              href: "/rep-pallet-details",
              label: "Pallet Details",
              active: pathname === "/rep-pallet-details",
              value: "5_10",
            },
            {
              href: "/rm-inward-details",
              label: "RM Inward Details",
              active: pathname === "/rm-inward-details",
              value: "5_11",
            },
            {
              href: "/gate-outward-details",
              label: "Gate Outward Details",
              active: pathname === "/gate-outward-details",
              value: "5_5",
            },
            {
              href: "/sql-exception",
              label: "Sql Exception",
              active: pathname === "/sql-exception",
              value: "5_6",
            },
            {
              href: "/audit-trail",
              label: "Audit Trail",
              active: pathname === "/audit-trail",
              value: "5_7",
            },
          ],
        },
        {
          href: "/tags",
          label: "Administrator",
          active: pathname.includes("/tags"),
          icon: Shield,
          value: "6",
          submenus: [
            {
              href: "/user-master",
              label: "User Master",
              active: pathname === "/user-master",
              value: "6_1",
            },
            {
              href: "/change-password",
              label: "Change Password",
              active: pathname === "/change-password",
              value: "6_3",
            },
          ],
        },
      ],
    },
  ];
}
