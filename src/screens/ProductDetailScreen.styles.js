import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  image: {
    borderRadius: 12,
    height: 240,
    marginBottom: 16,
    width: '100%',
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: '#374151',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#6b7280',
    fontWeight: '600',
  },
  value: {
    color: '#111827',
    fontWeight: '500',
  },
  cartButton: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 12,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#111827',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;
