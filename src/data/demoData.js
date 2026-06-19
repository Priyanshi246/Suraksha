export const customers = Array.from({ length: 120 }, (_, i) => {
  const names = [
    "Ramesh Patel","Suresh Kumar","Priya Sharma","Amit Singh","Neha Gupta","Vikram Reddy","Anita Desai","Rajesh Mehta","Sunita Verma","Kiran Rao",
    "Deepak Joshi","Meera Iyer","Arjun Nair","Pooja Shah","Manish Tiwari","Lakshmi Prasad","Sandeep Khanna","Divya Choudhury","Gaurav Mishra","Kavita Menon",
    "Nikhil Bhat","Rekha Pillai","Harsh Vardhan","Shalini Dutta","Vivek Agarwal","Sarita Bose","Rohan Das","Anjali Kulkarni","Parth Banerjee","Sneha Malhotra",
    "Dev Anand","Fatima Sheikh","Ishaan Chakraborty","Nandini Ghosh","Tejas Thakur","Jaya Sridhar","Mohit Saxena","Swati Jain","Aditya Bhandari","Tanya Mukherjee",
    "Rahul Bhatt","Nisha Hegde","Siddharth Pawar","Maya Kaur","Karthik Venkatesh","Disha Nambiar","Arun Prakash","Ritu Sharma","Pranav Iyengar","Aisha Qureshi",
    "Yash Kapoor","Bhavna Seth","Kunal Sengupta","Trisha Ghoshal","Omkar Tendulkar","Navya Raju","Dhruv Pillai","Komal Krishnamurthy","Tushar Bhatia","Sanya Rastogi",
    "Abhishek Yadav","Simran Chawla","Varun Narayan","Pallavi Murali","Rishabh Khatri","Meenakshi Subramaniam","Aakash Chandra","Hema Bhattacharya","Nitesh Rangan","Leela Gowda",
    "Shreyas Tandon","Priyanka Sinha","Ankur Dubey","Sahana Prabhu","Sameer Kaul","Radhika Ravi","Tanmay Hegde","Bhavika Shetty","Saurav Patel","Mitali Sen",
    "Chirag Modi","Ishita Rao","Prateek Ghosh","Sonal Mishra","Jayesh Bhatt","Nirali Deshmukh","Tarun Khurana","Rupali Chatterjee","Mohsin Ali","Sanya Nanda",
    "Sahil Kumar","Aarushi Mehta","Raghav Srinivasan","Sujata Barman","Karan Batra","Kalyani Chakraborty","Nirav Panchal","Ananya Sen Gupta","Rohit Shukla","Natasha Roy",
    "Utkarsh Sharma","Preeti Bansal","Samarth Rao","Shruti Kulkarni","Ravi Teja","Madhuri Dixit","Aryan Bhattacharjee","Ankita Paul","Siddharth Rao","Binita Kar",
    "Vishal Shetty","Purnima Das","Shubham Gupta","Riya Saha","Ajay Chauhan","Neelam Kaur","Sagnik Banerjee","Pallab Sen","Tushar Kumar","Sreetama Bose"
  ];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Patna"];
  const riskLevels = ["Low", "Medium", "High", "Critical"];
  const riskWeights = [0.6, 0.25, 0.1, 0.05];
  const randomRisk = () => {
    const r = Math.random();
    let cumulative = 0;
    for (let i = 0; i < riskWeights.length; i++) {
      cumulative += riskWeights[i];
      if (r < cumulative) return riskLevels[i];
    }
    return "Low";
  };
  const risk = randomRisk();
  return {
    id: `CUST-${1000 + i}`,
    name: names[i] || `Customer ${i + 1}`,
    email: `customer${i+1}@email.com`,
    phone: `+91 ${7000000000 + Math.floor(Math.random() * 999999999)}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    trustScore: Math.max(30, Math.min(98, Math.floor(70 + Math.random() * 30 - (risk === "Critical" ? 30 : risk === "High" ? 15 : risk === "Medium" ? 5 : 0)))),
    riskLevel: risk,
    status: risk === "Critical" ? "Blocked" : risk === "High" ? "Flagged" : "Active",
    lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    mfaEnabled: Math.random() > 0.3,
    devices: Math.floor(Math.random() * 4) + 1,
    totalTransactions: Math.floor(Math.random() * 500) + 10,
  };
});

export const transactions = Array.from({ length: 500 }, (_, i) => {
  const types = ["NEFT", "IMPS", "UPI", "RTGS", "Cheque", "ATM Withdrawal", "Online Purchase", "Bill Payment"];
  const statuses = ["Success", "Pending", "Failed", "Flagged"];
  const statusWeights = [0.78, 0.08, 0.05, 0.09];
  const randomStatus = () => {
    const r = Math.random();
    let cumulative = 0;
    for (let i = 0; i < statusWeights.length; i++) {
      cumulative += statusWeights[i];
      if (r < cumulative) return statuses[i];
    }
    return "Success";
  };
  const status = randomStatus();
  const amount = Math.floor(Math.random() * 500000) + 100;
  const riskScore = status === "Flagged" ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 60);
  return {
    id: `TXN-${2026000000 + i}`,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    type: types[Math.floor(Math.random() * types.length)],
    amount: amount,
    currency: "INR",
    status: status,
    riskScore: riskScore,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: `Transaction ${i + 1}`,
    beneficiary: `Beneficiary ${Math.floor(Math.random() * 200) + 1}`,
    ipAddress: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    deviceId: `DEV-${Math.floor(Math.random() * 300) + 1000}`,
  };
});

export const fraudCases = Array.from({ length: 45 }, (_, i) => {
  const types = ["Account Takeover", "KYC Fraud", "Device Spoofing", "Phishing", "Insider Threat", "Transaction Fraud", "SIM Swap"];
  const statuses = ["Open", "Investigating", "Resolved", "Escalated"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const type = types[Math.floor(Math.random() * types.length)];
  const priority = type === "Account Takeover" || type === "SIM Swap" ? "Critical" : priorities[Math.floor(Math.random() * priorities.length)];
  return {
    id: `FRD-${1000 + i}`,
    type: type,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priority,
    detectedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: `Analyst ${Math.floor(Math.random() * 8) + 1}`,
    description: `${type} detected on customer account`,
    lossAmount: Math.floor(Math.random() * 100000) + 1000,
    resolution: "",
  };
});

export const devices = Array.from({ length: 280 }, (_, i) => {
  const osList = ["Android", "iOS", "Windows", "macOS", "Linux"];
  const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera"];
  const trustScores = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
  const trustScore = Math.max(20, Math.min(98, trustScores[Math.floor(Math.random() * trustScores.length)]));
  return {
    id: `DEV-${1000 + i}`,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    deviceName: `${osList[Math.floor(Math.random() * osList.length)]} Device ${i + 1}`,
    os: osList[Math.floor(Math.random() * osList.length)],
    browser: browsers[Math.floor(Math.random() * browsers.length)],
    browserVersion: `${Math.floor(Math.random() * 20) + 100}`,
    fingerprint: `fp_${Math.random().toString(36).substring(2, 15)}`,
    ipAddress: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    city: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"][Math.floor(Math.random() * 8)],
    country: "India",
    trustScore: trustScore,
    riskLevel: trustScore > 80 ? "Trusted" : trustScore > 50 ? "Medium" : "High Risk",
    registeredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastSeen: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: Math.random() > 0.85,
  };
});

export const alerts = Array.from({ length: 60 }, (_, i) => {
  const types = ["Fraud Alert", "Device Alert", "Recovery Alert", "Insider Alert", "Security Alert"];
  const severities = ["Low", "Medium", "High", "Critical"];
  const type = types[Math.floor(Math.random() * types.length)];
  const severity = type === "Fraud Alert" || type === "Insider Alert" ? "Critical" : severities[Math.floor(Math.random() * severities.length)];
  return {
    id: `ALT-${1000 + i}`,
    type: type,
    severity: severity,
    title: `${type}: ${type === "Fraud Alert" ? "Suspicious transaction detected" : type === "Device Alert" ? "New device login" : type === "Recovery Alert" ? "Password reset attempt" : type === "Insider Alert" ? "Privileged access misuse" : "Security policy violation"}`,
    description: `Alert detected for customer ${customers[Math.floor(Math.random() * customers.length)].id}`,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: Math.random() > 0.6,
    status: Math.random() > 0.7 ? "Resolved" : "Active",
  };
});

export const recoveryAttempts = Array.from({ length: 35 }, (_, i) => {
  const types = ["Password Reset", "Email Change", "Mobile Change", "Account Recovery"];
  const statuses = ["Success", "Failed", "Pending", "Blocked"];
  const type = types[Math.floor(Math.random() * types.length)];
  const status = type === "Password Reset" && Math.random() > 0.8 ? "Blocked" : statuses[Math.floor(Math.random() * statuses.length)];
  return {
    id: `REC-${1000 + i}`,
    type: type,
    customerId: customers[Math.floor(Math.random() * customers.length)].id,
    status: status,
    timestamp: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    deviceId: `DEV-${Math.floor(Math.random() * 280) + 1000}`,
    suspicious: status === "Blocked" || (Math.random() > 0.85),
  };
});

export const insiderThreats = Array.from({ length: 25 }, (_, i) => {
  const employees = ["Analyst 1", "Analyst 2", "Analyst 3", "Analyst 4", "Analyst 5", "Manager 1", "Manager 2", "Admin 1", "Admin 2", "Support 1", "Support 2", "Support 3"];
  const types = ["Data Exfiltration", "Privilege Escalation", "Unauthorized Access", "Policy Violation", "Suspicious Query Pattern"];
  const type = types[Math.floor(Math.random() * types.length)];
  const riskScore = Math.floor(Math.random() * 100);
  return {
    id: `INS-${1000 + i}`,
    employeeId: `EMP-${1000 + i}`,
    employeeName: employees[Math.floor(Math.random() * employees.length)],
    department: ["IT Security", "Fraud Operations", "Customer Support", "Risk Management", "Compliance"][Math.floor(Math.random() * 5)],
    type: type,
    riskScore: riskScore,
    riskLevel: riskScore > 80 ? "High" : riskScore > 50 ? "Medium" : "Low",
    detectedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: Math.random() > 0.6 ? "Active" : "Resolved",
    description: `${type} detected in ${type === "Data Exfiltration" ? "bulk data download" : type === "Privilege Escalation" ? "unauthorized privilege request" : type === "Unauthorized Access" ? "after-hours system access" : type === "Policy Violation" ? "policy bypass attempt" : "unusual database query pattern"}`,
    dataAccessed: `${Math.floor(Math.random() * 1000)} records`,
  };
});

export const auditLogs = Array.from({ length: 100 }, (_, i) => {
  const actions = ["User Login", "User Logout", "Password Changed", "MFA Enabled", "MFA Disabled", "Device Registered", "Device Removed", "Alert Acknowledged", "Case Created", "Case Updated", "Case Resolved", "Policy Changed", "Rule Configured", "Report Generated", "Export Requested"];
  const actorTypes = ["User", "System", "Admin"];
  return {
    id: `AUD-${1000 + i}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    actorId: Math.random() > 0.3 ? `CUST-${1000 + Math.floor(Math.random() * 120)}` : `ADMIN-${100 + Math.floor(Math.random() * 10)}`,
    actorType: actorTypes[Math.floor(Math.random() * actorTypes.length)],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    ipAddress: `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
    details: `Action performed successfully`,
    severity: Math.random() > 0.9 ? "High" : "Normal",
  };
});

export const dashboardMetrics = {
  totalUsersProtected: 12450,
  activeSessions: 3842,
  fraudAttemptsPrevented: 1289,
  trustScoreAverage: 87,
  highRiskEvents: 23,
  newDevicesToday: 47,
  blockedTransactions: 156,
  pendingCases: 12,
};

export const fraudTrendData = [
  { month: "Jan", fraudDetected: 45, fraudPrevented: 42, falsePositives: 3 },
  { month: "Feb", fraudDetected: 52, fraudPrevented: 49, falsePositives: 3 },
  { month: "Mar", fraudDetected: 38, fraudPrevented: 36, falsePositives: 2 },
  { month: "Apr", fraudDetected: 65, fraudPrevented: 61, falsePositives: 4 },
  { month: "May", fraudDetected: 48, fraudPrevented: 45, falsePositives: 3 },
  { month: "Jun", fraudDetected: 71, fraudPrevented: 68, falsePositives: 3 },
  { month: "Jul", fraudDetected: 55, fraudPrevented: 52, falsePositives: 3 },
  { month: "Aug", fraudDetected: 62, fraudPrevented: 59, falsePositives: 3 },
  { month: "Sep", fraudDetected: 58, fraudPrevented: 55, falsePositives: 3 },
  { month: "Oct", fraudDetected: 44, fraudPrevented: 42, falsePositives: 2 },
  { month: "Nov", fraudDetected: 39, fraudPrevented: 37, falsePositives: 2 },
  { month: "Dec", fraudDetected: 50, fraudPrevented: 48, falsePositives: 2 },
];

export const riskDistributionData = [
  { name: "Trusted", value: 68, count: 8460 },
  { name: "Medium Risk", value: 22, count: 2739 },
  { name: "High Risk", value: 8, count: 996 },
  { name: "Critical", value: 2, count: 255 },
];

export const deviceTrustData = [
  { name: "Trusted", value: 198, count: 198 },
  { name: "New", value: 47, count: 47 },
  { name: "Suspicious", value: 28, count: 28 },
  { name: "Blocked", value: 7, count: 7 },
];

export const authActivityData = [
  { name: "Success", value: 8920 },
  { name: "MFA Required", value: 1230 },
  { name: "Face Verify", value: 340 },
  { name: "Blocked", value: 156 },
];

export const hourlyFraudData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  attempts: Math.floor(Math.random() * 15) + (i >= 0 && i <= 6 ? 2 : i >= 20 && i <= 23 ? 8 : 5),
  prevented: Math.floor(Math.random() * 12) + (i >= 0 && i <= 6 ? 1 : i >= 20 && i <= 23 ? 6 : 4),
}));

export const testimonials = [
  {
    id: 1,
    name: "Rajiv Mehta",
    role: "CISO",
    company: "Bank of Baroda",
    content: "Suraksha AI has transformed our identity security posture. The continuous trust validation approach reduced our fraud incidents by 78% in just six months.",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    role: "Head of Digital Banking",
    company: "Union Bank",
    content: "The behavioral analytics module is exceptional. It detects anomalies that traditional systems miss entirely, giving us a proactive defense against account takeovers.",
  },
  {
    id: 3,
    name: "Vikram Reddy",
    role: "VP, Risk Management",
    company: "Canara Bank",
    content: "We evaluated multiple solutions, but Suraksha AI's adaptive verification engine was the only one that balanced security with user experience seamlessly.",
  },
  {
    id: 4,
    name: "Anita Desai",
    role: "CTO",
    company: "Indian Bank",
    content: "The insider threat detection capabilities are world-class. Our compliance team now has real-time visibility into privileged access patterns.",
  },
];

export const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day],
    hour,
    value: Math.floor(Math.random() * 100),
  }))
).flat();
