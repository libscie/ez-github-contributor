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

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
