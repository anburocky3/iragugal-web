export interface BaseSelectOptions {
  id: number;
  title: string;
}

export type MemberRole = 'Basic' | 'Business';

export interface Member {
  name: string;
  fatherName: string;
  dob: string;
  email: string;
  waNumber: string;
  communicationAddress: string;
  currentLocation: string;
  voteLocation: string;
  interestedIn: string;
  membershipInterest: string;
  role: MemberRole;
}
