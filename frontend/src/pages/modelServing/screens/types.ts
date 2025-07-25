import { AlertVariant } from '@patternfly/react-core';
import { Connection } from '#~/concepts/connectionTypes/types';
import {
  ImagePullSecret,
  InferenceServiceKind,
  SecretKind,
  ServingContainer,
  ServingRuntimeKind,
} from '#~/k8sTypes';
import { EnvVariableDataEntry } from '#~/pages/projects/types';
import { ContainerResources } from '#~/types';
import { ToggleState } from '#~/components/StateActionToggle';

export enum PerformanceMetricType {
  SERVER = 'server',
  MODEL = 'model',
}

export enum MetricType {
  SERVER = 'server',
  MODEL = 'model',
  BIAS = 'bias',
}

export enum ServingRuntimeTableTabs {
  TYPE = 1,
  DEPLOYED_MODELS = 2,
  TOKENS = 3,
}

export enum InferenceServiceModelState {
  PENDING = 'Pending',
  STANDBY = 'Standby',
  FAILED_TO_LOAD = 'FailedToLoad',
  LOADING = 'Loading',
  LOADED = 'Loaded',
  UNKNOWN = 'Unknown',
}

export type ModelServingState = ToggleState & {
  inferenceService: InferenceServiceKind;
};

export type ModelStatus = {
  failedToSchedule: boolean;
  failureMessage?: string | null;
};

export type SupportedModelFormatsInfo = {
  name: string;
  version: string;
  autoSelect?: boolean;
  priority?: number;
};

export type CreatingServingRuntimeObject = CreatingModelServingObjectCommon & {
  servingRuntimeTemplateName: string;
  numReplicas: number;
  imageName?: string;
  supportedModelFormatsInfo?: SupportedModelFormatsInfo;
  scope?: string;
};

export type ServingRuntimeToken = {
  uuid: string;
  name: string;
  error: string;
  editName?: string;
};

export type ModelServingSize = {
  name: string;
  resources: ContainerResources;
};

export type CreatingInferenceServiceObject = CreatingModelServingObjectCommon & {
  project: string;
  servingRuntimeName: string;
  storage: InferenceServiceStorage;
  format: InferenceServiceFormat;
  maxReplicas: number;
  minReplicas: number;
  labels?: Record<string, string>;
  servingRuntimeArgs?: ServingContainer['args'];
  servingRuntimeEnvVars?: ServingContainer['env'];
  isKServeRawDeployment?: boolean;
  imagePullSecrets?: ImagePullSecret[];
  dashboardNamespace?: string;
};

export type CreatingModelServingObjectCommon = {
  name: string;
  k8sName: string;
  externalRoute: boolean;
  tokenAuth: boolean;
  tokens: ServingRuntimeToken[];
};

export enum InferenceServiceStorageType {
  NEW_STORAGE = 'new-storage',
  EXISTING_STORAGE = 'existing-storage',
  EXISTING_URI = 'existing-uri',
  PVC_STORAGE = 'pvc-storage',
}

export type InferenceServiceStorage = {
  type: InferenceServiceStorageType;
  path: string;
  dataConnection: string;
  uri?: string;
  awsData: EnvVariableDataEntry[];
  pvcConnection?: string;
  alert?: {
    type: AlertVariant;
    title: string;
    message: string;
  };
};

export type InferenceServiceFormat = {
  name: string;
  version?: string;
};

export type ServingRuntimeEditInfo = {
  servingRuntime?: ServingRuntimeKind;
  secrets: SecretKind[];
};

type PlatformStatus = {
  enabled: boolean;
  installed: boolean;
};
export type ServingPlatformStatuses = {
  kServe: PlatformStatus;
  kServeNIM: PlatformStatus;
  modelMesh: PlatformStatus;
  platformEnabledCount: number;
  refreshNIMAvailability: () => Promise<boolean | undefined>;
};

export type LabeledConnection = {
  connection: Connection;
  isRecommended?: boolean;
};
