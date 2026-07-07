import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ButtonDemo: undefined;
  TextInputDemo: undefined;
  CardDemo: undefined;
  DropdownDemo: undefined;
  CheckboxDemo: undefined;
  ModalDemo: undefined;
  SwitchDemo: undefined;
  RadioDemo: undefined;
  TabBarDemo: undefined;
  ToastDemo: undefined;
  HeaderDemo: undefined;
  Login: undefined;
  Products: undefined;
  ProductDetail: { id: number };
  AddProduct: undefined;
  EditProduct: { id: number };
  SunifyHome: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
