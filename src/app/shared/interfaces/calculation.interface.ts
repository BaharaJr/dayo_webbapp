export interface CalculationInterface {
  id: string;
  left: number;
  right: number;
  operator: string;
  result: number;
  email: string;
  created: string;
  lastUpdated: string;
}
export interface CalculationReqInterface {
  left: string;
  right: string;
  operator: string;
}

export interface CalculatorSuccessResponse {
  message: string;
  status?: number;
}
