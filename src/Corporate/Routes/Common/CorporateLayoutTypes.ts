export interface ICorporateLayouts {
  background: JSX.Element;
  declineCurveAnalysis: JSX.Element;
}

export type IdType = {
  declineCurveAnalysisId: keyof ICorporateLayouts;
};
