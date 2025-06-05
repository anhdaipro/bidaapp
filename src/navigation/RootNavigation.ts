import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';

// Định nghĩa kiểu cho các route
type RootStackParamList = {
  Login: undefined;
  AppNavigator: undefined;
  // Thêm các màn hình khác nếu cần
};

// Gán generic type cho navigationRef
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// export function navigate<RouteName extends keyof RootStackParamList>(
//   name: RouteName,
//   params?: RootStackParamList[RouteName]
// ) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }

export function resetToLogin() {
  if (navigationRef.isReady() && navigationRef.current) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }
}
