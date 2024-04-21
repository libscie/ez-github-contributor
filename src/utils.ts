export interface Props {
  value: string | undefined
  setValue: Function
}

export enum SubmissionType {
  Issue,
  PullRequest,
}

export interface Submission {
  title: String
  body: String
  contact?: String
  type: SubmissionType
}
