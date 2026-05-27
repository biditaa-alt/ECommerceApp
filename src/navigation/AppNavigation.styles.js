import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerActionSpacing: {
    marginLeft: 8,
  },
  cartBadge: {
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  logoutButton: {
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  logoutText: {
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '600',
  },
  detailCartText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;
