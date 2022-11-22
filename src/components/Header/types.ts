export interface DrawerProps {
  classes: string;
  toggleDrawerHandler: () => void
}

export interface Radio {
  title: string;
  value: string;
}

export interface RadioInputProps {
  radio: Radio;
  onSelectOption: (arg0: string) => void;
}