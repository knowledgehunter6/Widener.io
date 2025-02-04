import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, User</Text>
          <Text style={styles.subGreeting}>Let's find your dream job</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="send" size={24} color="#0891b2" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Applications</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="calendar" size={24} color="#0891b2" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Interviews</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="star" size={24} color="#0891b2" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Saved Jobs</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Interviews</Text>
          <View style={styles.interviewCard}>
            <Icon name="video" size={20} color="#0891b2" />
            <View style={styles.interviewInfo}>
              <Text style={styles.companyName}>Tech Corp</Text>
              <Text style={styles.interviewTime}>Today at 2:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Applications</Text>
          <View style={styles.applicationCard}>
            <View style={styles.applicationInfo}>
              <Text style={styles.jobTitle}>Senior Developer</Text>
              <Text style={styles.companyName}>Innovation Labs</Text>
              <Text style={styles.applicationStatus}>Status: Under Review</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subGreeting: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  interviewCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  interviewInfo: {
    marginLeft: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  interviewTime: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  applicationCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applicationInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  applicationStatus: {
    fontSize: 14,
    color: '#0891b2',
    marginTop: 4,
  },
});

export default DashboardScreen