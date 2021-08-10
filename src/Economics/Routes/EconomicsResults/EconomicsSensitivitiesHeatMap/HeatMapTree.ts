export const economicsTreeHard = () => {
  const data = {
    statusCode: 200,
    data: {
      heatMapTree: {
        id: "b156a9fb-19e6-45dd-8039-dd9c424b6b34",
        name: "Scenario",
        title: "Scenario",
        children: [
          {
            id: "2e468871-d295-4ca7-a479-2e458c1c88c6",
            name: "OIL/AG",
            title: "OIL/AG Development",
            children: [
              {
                id: "1f8713b2-664a-4702-b6b7-d0b919945802",
                name: "discountRate",
                title: "discountRate-10-20",
              },
              {
                id: "1059eb11-72bb-48f8-9d87-1cb79fe7d9f8",
                name: "oilPrice",
                title: "oilPrice-40-50",
              },
              {
                id: "f71bbaa4-5d3f-4765-8efe-9ea344b4a7db",
                name: "gasPrice",
                title: "gasPrice-3-4",
              },
            ],
          },
          {
            id: "72912efa-b056-4098-a1db-af69a71f7f1b",
            name: "NAG",
            title: "NAG Development",
            children: [
              {
                id: "1f8713b2-664a-4702-b6b7-d0b919945802",
                name: "discountRate",
                title: "discountRate-10-20",
              },
              {
                id: "1059eb11-72bb-48f8-9d87-1cb79fe7d9f8",
                name: "oilPrice",
                title: "oilPrice-40-50",
              },
              {
                id: "f71bbaa4-5d3f-4765-8efe-9ea344b4a7db",
                name: "gasPrice",
                title: "gasPrice-3-4",
              },
            ],
          },
          {
            id: "e3e42954-0bbd-47cd-a83a-e23460d3d05b",
            name: "OIL + NAG",
            title: "OIL + NAG Development",
            children: [
              {
                id: "1f8713b2-664a-4702-b6b7-d0b919945802",
                name: "discountRate",
                title: "discountRate-10-20",
              },
              {
                id: "1059eb11-72bb-48f8-9d87-1cb79fe7d9f8",
                name: "oilPrice",
                title: "oilPrice-40-50",
              },
              {
                id: "f71bbaa4-5d3f-4765-8efe-9ea344b4a7db",
                name: "gasPrice",
                title: "gasPrice-3-4",
              },
            ],
          },
        ],
      },
      plotChartsTree: {
        id: "f99afa5d-0b16-46f0-9ea0-e54799c58586",
        name: "Analysis",
        title: "Analysis",
        children: [
          {
            id: "b762ca47-2cef-4b1c-9776-3e80628fac63",
            name: "payout",
            title: "payout",
            children: [
              {
                id: "093186e3-28c4-4c6c-9b2e-07fef1292694",
                name: "OIL/AG",
                title: "OIL/AG Development",
                children: [
                  {
                    id: "5e5aeb1a-314c-45ba-8c90-799da3b3974a",
                    name: "discountRate",
                    title: "discountRate-10-20",
                    children: [
                      {
                        id: "81a6ffec-28cd-4a5e-ab05-4b7a92470a18",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "bcb022dc-3ddd-475c-ad3e-6839795c4a64",
                    name: "oilPrice",
                    title: "oilPrice-40-50",
                    children: [
                      {
                        id: "b94eb846-687f-4218-b081-e3486b7a2af2",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "6598b97d-fcbd-4ee2-9585-5c746bd8f512",
                    name: "gasPrice",
                    title: "gasPrice-3-4",
                    children: [
                      {
                        id: "23027d77-d958-4afb-a47d-a8da35a0913b",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "0b61f0d4-a9ad-465c-8aea-318531850c85",
                name: "NAG",
                title: "NAG Development",
                children: [
                  {
                    id: "5e5aeb1a-314c-45ba-8c90-799da3b3974a",
                    name: "discountRate",
                    title: "discountRate-10-20",
                    children: [
                      {
                        id: "81a6ffec-28cd-4a5e-ab05-4b7a92470a18",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "bcb022dc-3ddd-475c-ad3e-6839795c4a64",
                    name: "oilPrice",
                    title: "oilPrice-40-50",
                    children: [
                      {
                        id: "b94eb846-687f-4218-b081-e3486b7a2af2",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "6598b97d-fcbd-4ee2-9585-5c746bd8f512",
                    name: "gasPrice",
                    title: "gasPrice-3-4",
                    children: [
                      {
                        id: "23027d77-d958-4afb-a47d-a8da35a0913b",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "870cff6e-9334-4903-9bc1-9378c4298d9d",
                name: "OIL + NAG",
                title: "OIL + NAG Development",
                children: [
                  {
                    id: "5e5aeb1a-314c-45ba-8c90-799da3b3974a",
                    name: "discountRate",
                    title: "discountRate-10-20",
                    children: [
                      {
                        id: "81a6ffec-28cd-4a5e-ab05-4b7a92470a18",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "bcb022dc-3ddd-475c-ad3e-6839795c4a64",
                    name: "oilPrice",
                    title: "oilPrice-40-50",
                    children: [
                      {
                        id: "b94eb846-687f-4218-b081-e3486b7a2af2",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "6598b97d-fcbd-4ee2-9585-5c746bd8f512",
                    name: "gasPrice",
                    title: "gasPrice-3-4",
                    children: [
                      {
                        id: "23027d77-d958-4afb-a47d-a8da35a0913b",
                        name: "Project Net Cash Flow Table",
                        children: [
                          {
                            id: "a5eec79a-7726-4905-9f31-7ba315f9774e",
                            name: "year",
                            title: "Year",
                          },
                          {
                            id: "0b6268d6-e628-4fed-902d-ef69b4214324",
                            name: "inflation",
                            title: "inflation",
                          },
                          {
                            id: "bce729ee-98c7-4c5b-96e8-2cf672424a78",
                            name: "oilProdRate",
                            title: "Oil Prod Rate",
                          },
                          {
                            id: "7a872d9f-ee71-4666-b290-0ffc74f3bb8b",
                            name: "gasProdRate",
                            title: "Gas Prod Rate",
                          },
                          {
                            id: "dd2489d8-25da-470b-8627-e0c6484c49f5",
                            name: "totalExploartionCost",
                            title: "Total Exploartion Cost",
                          },
                          {
                            id: "e99409a8-b7c6-40bd-a2b5-150825371e45",
                            name: "totalDevelopmentCost",
                            title: "Total Development Cost",
                          },
                          {
                            id: "db7b3bbd-8039-4788-80bd-699898c61dc0",
                            name: "productionCost",
                            title: "Production Cost",
                          },
                          {
                            id: "a61c961a-21a2-4688-b88b-afaf33a04619",
                            name: "cumNCF",
                            title: "Cum NCF",
                          },
                          {
                            id: "41cd7e87-1602-446c-9a37-ebbe1b9dac77",
                            name: "projectNCF",
                            title: "Project NCF",
                          },
                          {
                            id: "9056599e-53c7-4e67-b69f-5a83e762f406",
                            name: "jVOilRev",
                            title: "JV Oil Sales Rev",
                          },
                          {
                            id: "420cb6d6-29b2-4864-8c93-dabd9b33b8fc",
                            name: "jVGasRev",
                            title: "JV Gas Sales Rev",
                          },
                          {
                            id: "7ece8f91-1721-4817-b7cf-8a66bc86c8fa",
                            name: "jVLPGRev",
                            title: "JV LPG Sales Rev",
                          },
                          {
                            id: "646dcf7e-c430-445b-9fc7-0fcd4768b592",
                            name: "jVInvestment",
                            title: "JV Investment",
                          },
                          {
                            id: "b80a6f69-f365-4f37-b489-4fca0f566aba",
                            name: "totalOilOpex",
                            title: "Total Oil Opex",
                          },
                          {
                            id: "fb8e7691-f704-4fce-ac70-2ed2fc0c5702",
                            name: "totalGovtTake",
                            title: "Total Govt Take",
                          },
                          {
                            id: "ad5f3a9f-3534-43b6-b1d0-fb6edb965e09",
                            name: "oilRoyToHead",
                            title: "Oil Roy To Head Farmor",
                          },
                          {
                            id: "2d3372fc-7a33-48db-8f0b-30e170838741",
                            name: "farmInSigBonus",
                            title: "Farm in Signature Bonus",
                          },
                          {
                            id: "9fbaee6d-6569-4a53-8322-a2a4f4cfbdcd",
                            name: "gasRoyToHead",
                            title: "Gas Roy To Head Farmor",
                          },
                          {
                            id: "52f02333-125c-4709-b469-743600bc6e1d",
                            name: "abandCostProv",
                            title: "Abandonment Cost Prov",
                          },
                          {
                            id: "38508334-d882-48a7-949d-d0c8ce7818ee",
                            name: "economicLimit",
                            title: "Economic Limit Indicator",
                          },
                          {
                            id: "a0f99323-7686-40ee-bc2e-f79d77b7f9a1",
                            name: "oilSalesPrice",
                            title: "Oil Price",
                          },
                          {
                            id: "85f84426-f09e-4d8b-b359-a0681dee5b7d",
                            name: "jVOilProd",
                            title: "JV Oil Prod",
                          },
                          {
                            id: "adf04414-bf10-4fa2-857f-28dc29dea2fe",
                            name: "jVOilRate",
                            title: "JV Oil Rate",
                          },
                          {
                            id: "63fb07e0-b6b5-45e4-8e08-31d6121b2624",
                            name: "jVLeanGas",
                            title: "JV Lean Gas",
                          },
                          {
                            id: "5b891367-af6f-4f07-9af1-d52b9cab8e14",
                            name: "jVLeanGasProdRate",
                            title: "JV LeanGas Prod Rate",
                          },
                          {
                            id: "b9b1c4d6-448b-4a74-b62d-b00d89cd11ed",
                            name: "jVLeanGasProd",
                            title: "JV Lean Gas Prod",
                          },
                          {
                            id: "8d38cdea-4106-48e3-b128-979c27b1af96",
                            name: "jVWHGasProdRate",
                            title: "JV WH Gas Prod Rate",
                          },
                          {
                            id: "fce0498b-dda9-47c6-ae1a-3e8e5cb573ef",
                            name: "lGPSalesPrice",
                            title: "LGP Sales Price",
                          },
                          {
                            id: "41ac7f97-fb9d-4d97-bf2b-80eab1886d90",
                            name: "jVLPGProd",
                            title: "JV LPG Prod",
                          },
                          {
                            id: "3af13972-60fe-4809-ac52-d1a6877514ae",
                            name: "jVWHGasProd",
                            title: "JV WH Gas Prod",
                          },
                          {
                            id: "26d4af1b-fc17-4ed2-9522-113978dd8882",
                            name: "gasSalesPrice",
                            title: "Gas Sales Price",
                          },
                          {
                            id: "bcf236d8-3e17-41f7-aa00-3f77c4f27903",
                            name: "cHAShuttleOpex",
                            title: "CHA Shuttle Opex",
                          },
                          {
                            id: "b0eb867b-e127-48d2-84e0-792a460ebdd8",
                            name: "facilityOpex",
                            title: "Facility Opex",
                          },
                          {
                            id: "6b75bc69-e934-48fd-a514-1a2a0bf54b93",
                            name: "corporateGACost",
                            title: "Corporate G&A Cost",
                          },
                          {
                            id: "2ee65b09-ab81-412a-b384-881e37bec4c4",
                            name: "effHeadFamorOilRoy",
                            title: "Eff. Head Famor Oil Roy",
                          },
                          {
                            id: "9e604716-a718-4eda-ba8c-296f6a356a18",
                            name: "effHeadFamorGasRoy",
                            title: "Eff Head Famor Gas Roy",
                          },
                          {
                            id: "e9220306-81a1-41b4-9af0-8fe2ea4408e7",
                            name: "oilRoyToGovt",
                            title: "Oil Roy To Govt",
                          },
                          {
                            id: "153a65cf-8251-4b6b-a741-39253ffcdd44",
                            name: "eduTaxAmount",
                            title: "Edu Tax",
                          },
                          {
                            id: "301a769f-6527-4402-bf33-17d15288f35c",
                            name: "grossFieldOpex",
                            title: "Gross Field Opex",
                          },
                          {
                            id: "0e5334c2-7e08-4a42-ab6e-147448d59fb2",
                            name: "gasOpex",
                            title: "Gas Opex",
                          },
                          {
                            id: "192f635f-599f-4ef4-8957-82e2f630e887",
                            name: "gasRoyToGovt",
                            title: "Gas Roy To Govt",
                          },
                          {
                            id: "0c0588ad-f61b-4a77-92e2-80e10fcd0f23",
                            name: "effGovtOilRoyRate",
                            title: "Eff Govt Oil Roy Rate",
                          },
                          {
                            id: "b2162b87-77d0-408d-9889-67faefbc3091",
                            name: "effGovtGasRoyRate",
                            title: "Eff Govt Gas Roy Rate",
                          },
                          {
                            id: "d96f6b05-3692-4793-9d2c-2d9442534acc",
                            name: "nDDC",
                            title: "NDDC",
                          },
                          {
                            id: "74df9d99-9109-4b3e-9d85-518bca639717",
                            name: "pPTA",
                            title: "PPTA",
                          },
                          {
                            id: "bbab62af-99d8-4550-9931-b247c8f833d8",
                            name: "applicablePPTRate",
                            title: "Applicable PPT Rate",
                          },
                          {
                            id: "d412f892-b950-4b9e-8795-87f13ed305d1",
                            name: "taxDepreciation",
                            title: "Tax Depreciation",
                          },
                          {
                            id: "2d2a8e9a-5673-464d-94f3-510e65a9f39b",
                            name: "gasFlarePenalty",
                            title: "Gas Flare Penalty",
                          },
                          {
                            id: "038beace-9c9f-43d5-a1ce-909aafe16040",
                            name: "cITAOnGas",
                            title: "CITA on Gas",
                          },
                          {
                            id: "7ed4c077-dd88-4bf7-a121-f17bd2dd895c",
                            name: "farmInSignatureBonus",
                            title: "Farm In Signature Bonus",
                          },
                          {
                            id: "c17ba015-7276-49d7-9835-5892c09b466d",
                            name: "barrelsOfOilEquivalent",
                            title: "Barrels Of Oil Equivalent",
                          },
                          {
                            id: "b335a180-5143-4ca9-9ce2-d3eed39f5175",
                            name: "discount10",
                            title: "Discount 10",
                          },
                          {
                            id: "16999599-0db5-4c70-b8d1-c772401a9709",
                            name: "discount15",
                            title: "Discount 15",
                          },
                          {
                            id: "4b58eaff-272b-4fb9-a175-77505dfb886a",
                            name: "nCF10",
                            title: "Net Cash Flow 10",
                          },
                          {
                            id: "60968a24-3bba-45d1-ba83-325ab377eeee",
                            name: "nCF15",
                            title: "Net Cash Flow 15",
                          },
                          {
                            id: "3174c6a8-ce19-4fb5-a4d3-341eb0a4f2b0",
                            name: "baseOilRate",
                            title: "Base Oil Rate",
                          },
                          {
                            id: "813528ff-a837-4c61-a4cd-2a89958cf7f8",
                            name: "condensateRate",
                            title: "Condensate Rate",
                          },
                          {
                            id: "87c01e16-9766-4327-9e0f-e2c45a5d73c0",
                            name: "associatedGasRate",
                            title: "Associated Gas Rate",
                          },
                          {
                            id: "75cccb86-20b2-484e-91ba-429f77509213",
                            name: "nonAssociatedGasRate",
                            title: "Non-Associated Gas Rate",
                          },
                          {
                            id: "6cbda2c9-e552-42e1-95c4-baae0f681f54",
                            name: "gasProcTraiffs",
                            title: "Gas Proc Traiffs",
                          },
                          {
                            id: "aeda2873-0930-44e3-984a-ad832956b54b",
                            name: "fees",
                            title: "fees",
                          },
                          {
                            id: "dbec0073-acbc-4383-9350-e03a5a47ad41",
                            name: "cHA",
                            title: "cHA",
                          },
                          {
                            id: "4f8ee81d-6ccd-4884-98b0-f698bf522c5a",
                            name: "terminalFeeOpex",
                            title: "Var Oil Opex (Terminaling Fee)",
                          },
                          {
                            id: "f4ffedd3-88cc-46df-bd11-537d9dc49a08",
                            name: "abandonmentCost",
                            title: "Abandonment Cost",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      templatesTree: {
        id: "53c6dd30-9ac5-405d-89cb-78600aef0cad",
        name: "Analysis",
        title: "Analysis",
        children: [
          {
            id: "84970bd0-f059-428a-8a2d-7ecd7bc44aaa",
            name: "payout",
            title: "payout",
            children: [
              {
                id: "cffd0da3-d0da-4dad-a1ad-cf124720daf7",
                name: "OIL/AG",
                title: "OIL/AG Development",
                children: [
                  {
                    id: "232b2de6-4e1b-4033-8262-bd52a87f04dd",
                    name: "discountRate",
                    title: "discountRate-10-20",
                    children: [
                      {
                        id: "1fc7eecc-1efe-445d-9c47-b98ce2c5f4bd",
                        name: "Charts",
                        children: [
                          {
                            id: "04e23a76-e02e-4d86-a2bb-30ab11561001",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "6d174edc-0950-497c-a74e-779e61b3426b",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "8d5475c2-abd5-4209-aae8-7f65bde37871",
                        name: "Tables",
                        children: [
                          {
                            id: "ef475500-354d-4db0-90bd-275adee974de",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "5265606f-b19b-455b-a2fb-b056d76afe2e",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "204f44b7-a50d-46c6-83b4-bd2f421a271c",
                    name: "oilPrice",
                    title: "oilPrice-40-50",
                    children: [
                      {
                        id: "55fc7f00-0a4f-4d65-a04b-8d41fd6748d0",
                        name: "Charts",
                        children: [
                          {
                            id: "08426983-1588-4bb2-8dd1-9ed329c57117",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "e8c23dfe-ee08-4d96-8dff-b174c6112708",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "064ad63f-0ecf-4987-9e79-9fc8a1597572",
                        name: "Tables",
                        children: [
                          {
                            id: "8e267d9d-4f12-4212-9be4-8a93f7084a5c",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "9de14a66-dcde-4dba-9f5a-4e7422c87ae1",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "1eebd004-2997-4dbf-8022-06c941cf2947",
                    name: "gasPrice",
                    title: "gasPrice-3-4",
                    children: [
                      {
                        id: "a99ced93-f7c0-4802-94f4-03abcb359912",
                        name: "Charts",
                        children: [
                          {
                            id: "fc9d43dd-abc3-4bb1-bfb4-151830901ad3",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "909d253c-4d29-4d18-a495-b46b32f1b0a6",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "177ad851-b98e-4fbb-bab6-4d49b55ea5d9",
                        name: "Tables",
                        children: [
                          {
                            id: "8e094ad3-48bd-4682-8ead-80c837b62275",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "0c8565cf-8f78-40cf-8537-5d2ba5fd3218",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "dcfe34c5-8db1-4621-a1b5-dfa3440f2585",
                name: "NAG",
                title: "NAG Development",
                children: [
                  {
                    id: "232b2de6-4e1b-4033-8262-bd52a87f04dd",
                    name: "discountRate",
                    title: "discountRate-10-20",
                    children: [
                      {
                        id: "1fc7eecc-1efe-445d-9c47-b98ce2c5f4bd",
                        name: "Charts",
                        children: [
                          {
                            id: "04e23a76-e02e-4d86-a2bb-30ab11561001",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "6d174edc-0950-497c-a74e-779e61b3426b",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "8d5475c2-abd5-4209-aae8-7f65bde37871",
                        name: "Tables",
                        children: [
                          {
                            id: "ef475500-354d-4db0-90bd-275adee974de",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "5265606f-b19b-455b-a2fb-b056d76afe2e",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "204f44b7-a50d-46c6-83b4-bd2f421a271c",
                    name: "oilPrice",
                    title: "oilPrice-40-50",
                    children: [
                      {
                        id: "55fc7f00-0a4f-4d65-a04b-8d41fd6748d0",
                        name: "Charts",
                        children: [
                          {
                            id: "08426983-1588-4bb2-8dd1-9ed329c57117",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "e8c23dfe-ee08-4d96-8dff-b174c6112708",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "064ad63f-0ecf-4987-9e79-9fc8a1597572",
                        name: "Tables",
                        children: [
                          {
                            id: "8e267d9d-4f12-4212-9be4-8a93f7084a5c",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "9de14a66-dcde-4dba-9f5a-4e7422c87ae1",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "1eebd004-2997-4dbf-8022-06c941cf2947",
                    name: "gasPrice",
                    title: "gasPrice-3-4",
                    children: [
                      {
                        id: "a99ced93-f7c0-4802-94f4-03abcb359912",
                        name: "Charts",
                        children: [
                          {
                            id: "fc9d43dd-abc3-4bb1-bfb4-151830901ad3",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "909d253c-4d29-4d18-a495-b46b32f1b0a6",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "177ad851-b98e-4fbb-bab6-4d49b55ea5d9",
                        name: "Tables",
                        children: [
                          {
                            id: "8e094ad3-48bd-4682-8ead-80c837b62275",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "0c8565cf-8f78-40cf-8537-5d2ba5fd3218",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "fc5d510d-2d0d-4b88-950a-cf83c7dc7220",
                name: "OIL + NAG",
                title: "OIL + NAG Development",
                children: [
                  {
                    id: "232b2de6-4e1b-4033-8262-bd52a87f04dd",
                    name: "discountRate",
                    title: "discountRate-10-20",
                    children: [
                      {
                        id: "1fc7eecc-1efe-445d-9c47-b98ce2c5f4bd",
                        name: "Charts",
                        children: [
                          {
                            id: "04e23a76-e02e-4d86-a2bb-30ab11561001",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "6d174edc-0950-497c-a74e-779e61b3426b",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "8d5475c2-abd5-4209-aae8-7f65bde37871",
                        name: "Tables",
                        children: [
                          {
                            id: "ef475500-354d-4db0-90bd-275adee974de",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "5265606f-b19b-455b-a2fb-b056d76afe2e",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "204f44b7-a50d-46c6-83b4-bd2f421a271c",
                    name: "oilPrice",
                    title: "oilPrice-40-50",
                    children: [
                      {
                        id: "55fc7f00-0a4f-4d65-a04b-8d41fd6748d0",
                        name: "Charts",
                        children: [
                          {
                            id: "08426983-1588-4bb2-8dd1-9ed329c57117",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "e8c23dfe-ee08-4d96-8dff-b174c6112708",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "064ad63f-0ecf-4987-9e79-9fc8a1597572",
                        name: "Tables",
                        children: [
                          {
                            id: "8e267d9d-4f12-4212-9be4-8a93f7084a5c",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "9de14a66-dcde-4dba-9f5a-4e7422c87ae1",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "1eebd004-2997-4dbf-8022-06c941cf2947",
                    name: "gasPrice",
                    title: "gasPrice-3-4",
                    children: [
                      {
                        id: "a99ced93-f7c0-4802-94f4-03abcb359912",
                        name: "Charts",
                        children: [
                          {
                            id: "fc9d43dd-abc3-4bb1-bfb4-151830901ad3",
                            name: "projectNCF",
                            title: "Net Cash Flow",
                          },
                          {
                            id: "909d253c-4d29-4d18-a495-b46b32f1b0a6",
                            name: "cumNCF",
                            title: "Cum Cash Flow",
                          },
                        ],
                      },
                      {
                        id: "177ad851-b98e-4fbb-bab6-4d49b55ea5d9",
                        name: "Tables",
                        children: [
                          {
                            id: "8e094ad3-48bd-4682-8ead-80c837b62275",
                            name: "economicEvaluationResults",
                            title: "Economics Evaluation",
                          },
                          {
                            id: "0c8565cf-8f78-40cf-8537-5d2ba5fd3218",
                            name: "valueDistributions",
                            title: "Value Distributions",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    success: true,
  };

  return data;
};