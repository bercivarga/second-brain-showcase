import {
  CardStackIcon,
  GridIcon,
  HomeIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    label: "New note",
    href: "/notes/new",
    icon: Pencil2Icon,
  },
  {
    label: "All notes",
    href: "/notes",
    icon: CardStackIcon,
  },
  {
    label: "Map",
    href: "/map",
    icon: GridIcon,
  },
];

export default navItems;
