interface ProofValue {
  [index: string]: { raw: string; encoded: string };
}

export interface ICredentialProof {
  success: boolean;
  state: string;
  result: {
    presentation: {
      requested_proof: {
        revealed_attr_groups: {
          "self-verify-proof": {
            sub_proof_index: number;
            values: ProofValue;
          };
        };
      };
    };
  };
}

export interface ICredentialPresExchange {
  success: boolean;
  presentation_exchange_id: string;
}
