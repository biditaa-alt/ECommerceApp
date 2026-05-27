import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
    padding: 12,
  },
  listContent: {
    paddingBottom: 90,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    height: 110,
    width: 100,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  price: {
    color: '#374151',
    marginTop: 6,
  },
  qtyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  qtyButton: {
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  qtyButtonText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '600',
  },
  qtyText: {
    color: '#111827',
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 'auto',
  },
  removeButtonText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 10,
    bottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: 'absolute',
    right: 12,
  },
  totalLabel: {
    color: '#d1d5db',
    fontSize: 14,
    fontWeight: '500',
  },
  totalValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: '#4b5563',
    fontSize: 16,
  },
});

export default styles;
