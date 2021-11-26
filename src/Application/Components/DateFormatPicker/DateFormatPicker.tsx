import React from "react";
import { OnChangeValue } from "react-select";
import AnalyticsComp from "../Basic/AnalyticsComp";
import ApexSelectRS from "../Selects/ApexSelectRS";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { ISelectOption } from "./../Selects/SelectItemsType";
import {
  dayOptions,
  IDateFormatPicker,
  monthOptions,
  TDayOption,
  TMonthOption,
  TYearOption,
  yearOptions,
} from "./DateFormatPickerTypes";

const DateFormatPicker = ({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  handleDateFormatChange,
}: IDateFormatPicker) => {
  return (
    <ApexFlexContainer
      justifyContent="space-between"
      width={"100%"}
      height={100}
    >
      <AnalyticsComp
        title="Date Format"
        direction="Vertical"
        containerStyle={{ width: "100%" }}
        content={
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <ApexSelectRS
              valueOption={day}
              data={dayOptions}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                option && setDay(option as TDayOption);
                handleDateFormatChange(option);
              }}
              isSelectOptionType={true}
              menuPortalTarget={document.body}
              containerHeight={40}
            />

            <ApexSelectRS
              valueOption={month}
              data={monthOptions}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                option && setMonth(option as TMonthOption);
                handleDateFormatChange(option);
              }}
              isSelectOptionType={true}
              menuPortalTarget={document.body}
              containerHeight={40}
            />
            <ApexSelectRS
              valueOption={year}
              data={yearOptions}
              handleSelect={(option: OnChangeValue<ISelectOption, false>) => {
                option && setYear(option as TYearOption);
                handleDateFormatChange(option);
              }}
              isSelectOptionType={true}
              menuPortalTarget={document.body}
              containerHeight={40}
            />
          </div>
        }
      />
    </ApexFlexContainer>
  );
};

export default DateFormatPicker;
