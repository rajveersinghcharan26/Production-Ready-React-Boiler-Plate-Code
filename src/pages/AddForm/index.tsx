/**
 * Add Form Page
 * Demonstrates comprehensive form validation using React Hook Form
 * with all reusable form components.
 */

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { Save, Cancel, ArrowBack } from '@mui/icons-material';

import {
  Button,
  FormField,
  FormSelect,
  FormMultiSelect,
  FormDateTimePicker,
  FormFileUpload,
  FormSwitch,
  PageHeader,
  Card,
} from '@/components/common';
import { ROUTES } from '@/config/constants';

// Form field types
interface IFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  
  // Account Details
  username: string;
  password: string;
  confirmPassword: string;
  
  // Preferences
  country: string;
  state: string;
  skills: (string | number)[];
  interests: (string | number)[];
  preferredContactTime: string;
  availableStartDate: string;
  expectedSalary: string;
  
  // Notifications
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  
  // Documents
  profilePicture: File[];
  resume: File[];
  
  // Additional
  bio: string;
  website: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

// Default form values
const defaultValues: IFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  username: '',
  password: '',
  confirmPassword: '',
  country: '',
  state: '',
  skills: [],
  interests: [],
  preferredContactTime: '',
  availableStartDate: '',
  expectedSalary: '',
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
  profilePicture: [],
  resume: [],
  bio: '',
  website: '',
  agreeToTerms: false,
  subscribeNewsletter: false,
};

// Options for select fields
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer not to say', value: 'prefer_not_to_say' },
];

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'India', value: 'in' },
  { label: 'Japan', value: 'jp' },
];

const stateOptions = [
  { label: 'California', value: 'ca' },
  { label: 'New York', value: 'ny' },
  { label: 'Texas', value: 'tx' },
  { label: 'Florida', value: 'fl' },
  { label: 'Washington', value: 'wa' },
  { label: 'Other', value: 'other' },
];

const skillsOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'SQL', value: 'sql' },
  { label: 'AWS', value: 'aws' },
];

const interestsOptions = [
  { label: 'Web Development', value: 'web' },
  { label: 'Mobile Development', value: 'mobile' },
  { label: 'Data Science', value: 'data' },
  { label: 'Machine Learning', value: 'ml' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Cloud Computing', value: 'cloud' },
  { label: 'Cybersecurity', value: 'security' },
  { label: 'UI/UX Design', value: 'design' },
];

// Validation patterns
const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  decimal: /^\d+(\.\d{1,2})?$/,
};

// Helper to calculate age from date of birth
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export function AddFormPage() {
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<IFormData | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormData>({
    defaultValues,
    mode: 'onBlur', // Validate on blur
  });

  // Watch password for confirm password validation
  const password = watch('password');

  const onSubmit = async (data: IFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setSubmitSuccess(true);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  const handleBack = () => {
    navigate(ROUTES.COMPONENT_SHOWCASE);
  };

  return (
    <Box>
      <PageHeader
        title="Add Form"
        subtitle="Comprehensive form validation demo using React Hook Form"
        breadcrumbs={[
          { label: 'Component Showcase', path: ROUTES.COMPONENT_SHOWCASE },
          { label: 'Add Form' },
        ]}
        actions={
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Back to Showcase
          </Button>
        }
      />

      <Alert severity="info" sx={{ mb: 3 }}>
        This form demonstrates validation patterns for all form components. 
        Try submitting with empty or invalid fields to see validation messages.
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ==================== PERSONAL INFORMATION ==================== */}
        <Card title="Personal Information" subtitle="Basic details about yourself" sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* First Name - Required, min 2 chars */}
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: 'First name is required',
                  minLength: { value: 2, message: 'First name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'First name cannot exceed 50 characters' },
                }}
                render={({ field }) => (
                  <FormField
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Last Name - Required, min 2 chars */}
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'Last name cannot exceed 50 characters' },
                }}
                render={({ field }) => (
                  <FormField
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Email - Required, valid email format */}
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: patterns.email, message: 'Please enter a valid email address' },
                }}
                render={({ field }) => (
                  <FormField
                    label="Email Address"
                    placeholder="example@email.com"
                    type="email"
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Phone - Optional, valid phone pattern */}
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: { value: patterns.phone, message: 'Please enter a valid phone number' },
                }}
                render={({ field }) => (
                  <FormField
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    error={!!errors.phone}
                    helperText={errors.phone?.message || 'Optional - for account recovery'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Date of Birth - Required, must be 18+ */}
            <Grid item xs={12} md={6}>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: 'Date of birth is required',
                  validate: (value) => {
                    if (!value) return 'Date of birth is required';
                    const age = calculateAge(value);
                    if (age < 18) return 'You must be at least 18 years old';
                    if (age > 120) return 'Please enter a valid date of birth';
                    return true;
                  },
                }}
                render={({ field }) => (
                  <FormDateTimePicker
                    caption="Date of Birth"
                    type="date"
                    required
                    max={new Date().toISOString().split('T')[0]}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Gender - Required */}
            <Grid item xs={12} md={6}>
              <Controller
                name="gender"
                control={control}
                rules={{ required: 'Please select your gender' }}
                render={({ field }) => (
                  <FormSelect
                    caption="Gender"
                    options={genderOptions}
                    placeholder="Select gender"
                    required
                    fullWidth
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ==================== ACCOUNT DETAILS ==================== */}
        <Card title="Account Details" subtitle="Create your login credentials" sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* Username - Required, 3-20 chars, alphanumeric */}
            <Grid item xs={12} md={6}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' },
                  maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
                  pattern: { value: patterns.username, message: 'Username can only contain letters, numbers, and underscores' },
                }}
                render={({ field }) => (
                  <FormField
                    label="Username"
                    placeholder="Enter a unique username"
                    required
                    error={!!errors.username}
                    helperText={errors.username?.message || '3-20 characters, letters, numbers, underscores only'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Empty grid item for alignment */}
            <Grid item xs={12} md={6} />

            {/* Password - Required, complex validation */}
            <Grid item xs={12} md={6}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: { 
                    value: patterns.password, 
                    message: 'Password must contain uppercase, lowercase, and a number' 
                  },
                }}
                render={({ field }) => (
                  <FormField
                    label="Password"
                    placeholder="Create a strong password"
                    type="password"
                    required
                    error={!!errors.password}
                    helperText={errors.password?.message || 'Min 8 chars with uppercase, lowercase, and number'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Confirm Password - Must match password */}
            <Grid item xs={12} md={6}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                }}
                render={({ field }) => (
                  <FormField
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    type="password"
                    required
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ==================== PREFERENCES ==================== */}
        <Card title="Preferences" subtitle="Your location and professional details" sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* Country - Required */}
            <Grid item xs={12} md={6}>
              <Controller
                name="country"
                control={control}
                rules={{ required: 'Please select your country' }}
                render={({ field }) => (
                  <FormSelect
                    caption="Country"
                    options={countryOptions}
                    placeholder="Select your country"
                    required
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* State - Optional */}
            <Grid item xs={12} md={6}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    caption="State/Province"
                    options={stateOptions}
                    placeholder="Select state (optional)"
                    fullWidth
                    helperText="Optional - if applicable"
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Skills - Required, at least 2 */}
            <Grid item xs={12} md={6}>
              <Controller
                name="skills"
                control={control}
                rules={{
                  required: 'Please select at least one skill',
                  validate: (value) => 
                    (value && value.length >= 2) || 'Please select at least 2 skills',
                }}
                render={({ field }) => (
                  <FormMultiSelect
                    caption="Technical Skills"
                    options={skillsOptions}
                    placeholder="Select your skills"
                    required
                    fullWidth
                    error={!!errors.skills}
                    helperText={errors.skills?.message || 'Select at least 2 skills'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Interests - Optional */}
            <Grid item xs={12} md={6}>
              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <FormMultiSelect
                    caption="Areas of Interest"
                    options={interestsOptions}
                    placeholder="Select interests (optional)"
                    fullWidth
                    helperText="Optional - helps us personalize your experience"
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Preferred Contact Time - Optional */}
            <Grid item xs={12} md={6}>
              <Controller
                name="preferredContactTime"
                control={control}
                render={({ field }) => (
                  <FormDateTimePicker
                    caption="Preferred Contact Time"
                    type="time"
                    helperText="Optional - when would you like us to contact you?"
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Available Start Date - Optional, must be future */}
            <Grid item xs={12} md={6}>
              <Controller
                name="availableStartDate"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value) return true; // Optional field
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (selectedDate < today) return 'Start date must be in the future';
                    return true;
                  },
                }}
                render={({ field }) => (
                  <FormDateTimePicker
                    caption="Available Start Date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    error={!!errors.availableStartDate}
                    helperText={errors.availableStartDate?.message || 'Optional - when can you start?'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Expected Salary - Decimal validation */}
            <Grid item xs={12} md={6}>
              <Controller
                name="expectedSalary"
                control={control}
                rules={{
                  required: 'Expected salary is required',
                  pattern: {
                    value: patterns.decimal,
                    message: 'Please enter a valid amount (e.g., 50000.00)',
                  },
                  validate: {
                    minValue: (value) => {
                      const num = parseFloat(value);
                      if (isNaN(num)) return 'Please enter a valid number';
                      if (num < 1000) return 'Minimum salary is 1,000';
                      return true;
                    },
                    maxValue: (value) => {
                      const num = parseFloat(value);
                      if (num > 10000000) return 'Maximum salary is 10,000,000';
                      return true;
                    },
                  },
                }}
                render={({ field }) => (
                  <FormField
                    label="Expected Salary (Annual)"
                    placeholder="e.g., 75000.00"
                    type="text"
                    inputMode="decimal"
                    required
                    error={!!errors.expectedSalary}
                    helperText={errors.expectedSalary?.message || 'Enter amount with up to 2 decimal places'}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ==================== NOTIFICATION SETTINGS ==================== */}
        <Card title="Notification Settings" subtitle="Manage how we communicate with you" sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* Email Notifications - Optional toggle */}
            <Grid item xs={12} md={4}>
              <Controller
                name="emailNotifications"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormSwitch
                    caption="Email Notifications"
                    label="Receive important updates via email"
                    checked={value}
                    onChange={(_, checked) => onChange(checked)}
                    color="primary"
                    helperText="Account updates and security alerts"
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* SMS Notifications - Optional toggle */}
            <Grid item xs={12} md={4}>
              <Controller
                name="smsNotifications"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormSwitch
                    caption="SMS Notifications"
                    label="Receive SMS alerts"
                    checked={value}
                    onChange={(_, checked) => onChange(checked)}
                    color="secondary"
                    helperText="Requires valid phone number"
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Marketing Emails - Optional toggle */}
            <Grid item xs={12} md={4}>
              <Controller
                name="marketingEmails"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormSwitch
                    caption="Marketing"
                    label="Promotional offers and news"
                    checked={value}
                    onChange={(_, checked) => onChange(checked)}
                    color="info"
                    helperText="You can unsubscribe anytime"
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ==================== DOCUMENTS ==================== */}
        <Card title="Documents" subtitle="Upload required documents" sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* Profile Picture - Optional, images only, max 2MB */}
            <Grid item xs={12} md={6}>
              <Controller
                name="profilePicture"
                control={control}
                rules={{
                  validate: (files) => {
                    if (!files || files.length === 0) return true; // Optional
                    const file = files[0];
                    if (!file) return true;
                    if (!file.type.startsWith('image/')) return 'Only image files are allowed';
                    if (file.size > 2 * 1024 * 1024) return 'Image must be less than 2MB';
                    return true;
                  },
                }}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormFileUpload
                    caption="Profile Picture"
                    accept="image/*"
                    maxSize={2 * 1024 * 1024}
                    maxFiles={1}
                    value={value}
                    onChange={onChange}
                    error={!!errors.profilePicture}
                    helperText={errors.profilePicture?.message as string || 'Optional - JPG, PNG, max 2MB'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Resume - Required, PDF only, max 5MB */}
            <Grid item xs={12} md={6}>
              <Controller
                name="resume"
                control={control}
                rules={{
                  required: 'Resume is required',
                  validate: (files) => {
                    if (!files || files.length === 0) return 'Resume is required';
                    const file = files[0];
                    if (!file) return 'Resume is required';
                    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                    if (!allowedTypes.includes(file.type)) return 'Only PDF and DOC files are allowed';
                    if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB';
                    return true;
                  },
                }}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormFileUpload
                    caption="Resume/CV"
                    accept=".pdf,.doc,.docx"
                    maxSize={5 * 1024 * 1024}
                    maxFiles={1}
                    required
                    value={value}
                    onChange={onChange}
                    error={!!errors.resume}
                    helperText={errors.resume?.message as string || 'Required - PDF or DOC, max 5MB'}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ==================== ADDITIONAL INFORMATION ==================== */}
        <Card title="Additional Information" subtitle="Tell us more about yourself" sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* Bio - Optional, max 500 chars */}
            <Grid item xs={12}>
              <Controller
                name="bio"
                control={control}
                rules={{
                  maxLength: { value: 500, message: 'Bio cannot exceed 500 characters' },
                }}
                render={({ field }) => (
                  <FormField
                    label="Bio / About Me"
                    placeholder="Tell us about yourself, your experience, and goals..."
                    multiline
                    rows={4}
                    error={!!errors.bio}
                    helperText={errors.bio?.message || `${field.value?.length || 0}/500 characters`}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Website - Optional, valid URL */}
            <Grid item xs={12} md={6}>
              <Controller
                name="website"
                control={control}
                rules={{
                  pattern: { value: patterns.url, message: 'Please enter a valid URL' },
                }}
                render={({ field }) => (
                  <FormField
                    label="Personal Website / Portfolio"
                    placeholder="https://yourwebsite.com"
                    error={!!errors.website}
                    helperText={errors.website?.message || 'Optional - your portfolio or LinkedIn'}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Subscribe Newsletter - Optional */}
            <Grid item xs={12} md={6}>
              <Controller
                name="subscribeNewsletter"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormSwitch
                    caption="Newsletter"
                    label="Subscribe to our weekly newsletter"
                    checked={value}
                    onChange={(_, checked) => onChange(checked)}
                    helperText="Get the latest updates and tips"
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        {/* ==================== TERMS & CONDITIONS ==================== */}
        <Card title="Terms & Conditions" sx={{ mb: 3 }}>
          <Controller
            name="agreeToTerms"
            control={control}
            rules={{
              required: 'You must agree to the terms and conditions',
              validate: (value) => value === true || 'You must agree to the terms and conditions',
            }}
            render={({ field: { value, onChange, ...field } }) => (
              <FormSwitch
                label="I agree to the Terms of Service and Privacy Policy"
                checked={value}
                onChange={(_, checked) => onChange(checked)}
                required
                error={!!errors.agreeToTerms}
                helperText={errors.agreeToTerms?.message as string}
                {...field}
              />
            )}
          />
        </Card>

        {/* ==================== FORM ACTIONS ==================== */}
        <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Cancel />}
            onClick={handleReset}
          >
            Reset Form
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              loading={isSubmitting}
              loadingText="Submitting..."
            >
              Submit Form
            </Button>
          </Box>
        </Paper>
      </form>

      {/* Success Snackbar */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={() => setSubmitSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setSubmitSuccess(false)}
          sx={{ width: '100%' }}
        >
          Form submitted successfully! Check the console for submitted data.
        </Alert>
      </Snackbar>

      {/* Show submitted data for demo */}
      {submittedData && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom color="success.main">
            ✓ Form Submitted Successfully
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" component="pre" sx={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            backgroundColor: 'grey.100',
            p: 2,
            borderRadius: 1,
            fontSize: '0.75rem',
          }}>
            {JSON.stringify(submittedData, (_key, value) => {
              // Convert File objects to readable format
              if (value instanceof File) {
                return `File: ${value.name} (${(value.size / 1024).toFixed(2)} KB)`;
              }
              if (Array.isArray(value) && value[0] instanceof File) {
                return value.map(f => `File: ${f.name} (${(f.size / 1024).toFixed(2)} KB)`);
              }
              return value;
            }, 2)}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default AddFormPage;
