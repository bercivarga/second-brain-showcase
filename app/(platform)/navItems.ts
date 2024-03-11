import { CardStackIcon, GridIcon, Pencil2Icon } from "@radix-ui/react-icons";

const navItems = [
  {
    label: "All notes",
    href: "/notes",
    icon: CardStackIcon,
  },
  {
    label: "New note",
    href: "/notes/new",
    icon: Pencil2Icon,
  },
  {
    label: "Map",
    href: "/map",
    icon: GridIcon,
  },
];

export default navItems;
