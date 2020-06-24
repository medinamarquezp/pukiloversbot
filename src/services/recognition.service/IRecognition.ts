interface Irecognition {
  status: Status;
  outputs?: (OutputsEntity)[] | null;
}
interface Status {
  code: number;
  description: string;
  req_id: string;
}
interface OutputsEntity {
  id: string;
  status: StatusNode;
  created_at: string;
  model: Model;
  input: Input;
  data: Data;
}
interface StatusNode {
  code: number;
  description: string;
}
interface Model {
  id: string;
  name: string;
  created_at: string;
  app_id: string;
  output_info: OutputInfo;
  model_version: ModelVersion;
  display_name: string;
  input_info: InputInfoOrTrainInfo;
  train_info: InputInfoOrTrainInfo;
  model_type_id: string;
}
interface OutputInfo {
  output_config: OutputConfig;
  message: string;
  type: string;
  type_ext: string;
}
interface OutputConfig {
  concepts_mutually_exclusive: boolean;
  closed_environment: boolean;
  max_concepts: number;
  min_value: number;
}
interface ModelVersion {
  id: string;
  created_at: string;
  status: StatusNode;
}
interface InputInfoOrTrainInfo {}
interface Input {
  id: string;
  data: InputData;
}
interface InputData {
  image: Image;
}
interface Image {
  url: string;
}
interface Data {
  concepts?: (ConceptsEntity)[] | null;
}
interface ConceptsEntity {
  id: string;
  name: string;
  value: number;
  app_id: string;
}

export { Irecognition as default }