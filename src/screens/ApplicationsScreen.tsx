import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const MOCK_APPLICATIONS = [
  {
    id: '1',
    jobTitle: 'Senior React Native Developer',
    company: 'Tech Solutions Inc.',
    status: 'Under Review',
    appliedDate: '2024-02-20',
    statusColor: '#eab308', // yellow
  },
  {
    id: '2',
    jobTitle: 'Full Stack Developer',
    company: 'Digital Innovations',
    status: 'Interview Scheduled',
    appliedDate: '2024-02-18',
    statusColor: '#22c55e', // green
  },
  // Add more mock applications as needed
];

const ApplicationsScreen = () => {
  const renderApplicationCard = ({ item }) => (
    <View style={styles.applicationCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
          <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Icon name="calendar" size={16} color="#64748b" />
          <Text style={styles.footerText}>Applied: {item.appliedDate}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#64748b" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Applications</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={MOCK_APPLICATIONS}
        renderItem={renderApplicationCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.applicationsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  applicationsList: {
    padding: 16,
  },
  applicationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  companyName: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
});

export default ApplicationsScreen