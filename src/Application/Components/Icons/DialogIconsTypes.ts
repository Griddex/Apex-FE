import { DialogStuff } from "../Dialogs/DialogTypes";

export type IconName = NonNullable<DialogStuff["iconType"]>;
export type DialogIconsType = Record<IconName, JSX.Element>;
