import { Button, Input, useTheme } from "@material-ui/core";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import {
  FormatSpecifier,
  formatSpecifier as parseFormat,
  FormatSpecifierObject,
} from "d3-format";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { components, OptionProps, ValueType } from "react-select";
import AnalyticsComp from "../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../Application/Components/Selects/ApexSelectRS";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import ApexMuiSwitch from "../../../Application/Components/Switches/ApexMuiSwitch";
import {
  valueAlignOptions,
  valueSignOptions,
  valueSymbolOptions,
  valueTypeOptions,
} from "../../Data/VisualyticsData";
import { IExtendedSelectOption } from "./../../../Application/Components/Selects/SelectItemsType";
import {
  IChartInputSubFormatters,
  IChartSelectSubFormatters,
  IChartSwitchSubFormatters,
  IChartValueFormatters,
} from "./ChartValueFormattersTypes";

const Option = (props: OptionProps<IExtendedSelectOption, false>) => (
  <components.Option {...props}>
    {props.label === undefined && "none"}
    {props.label !== undefined && (
      <>
        <strong>{props.label}</strong> {props.data.description}
      </>
    )}
  </components.Option>
);

const ChartValueFormatters = ({
  basePath,
  intialFormatValue,
  plotRef,
  updateParameterAction,
  axisFormatTitle,
  setValueFormat,
}: IChartValueFormatters) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [formatValue, setFormatValue] = useState(intialFormatValue);
  const [isEditing, setIsEditing] = useState(false);

  const formatSpecifierOrig = useMemo(
    () => parseFormat(formatValue.format as string),
    [formatValue.format]
  );

  const formatSpecifier = Object.keys(formatSpecifierOrig).reduce(
    (acc, key) => {
      const keyDefined = key as keyof FormatSpecifierObject;
      const value = formatSpecifierOrig[keyDefined];
      if (["zero"].includes(keyDefined)) {
        return { ...acc, [key]: value?.toString() };
      } else {
        return { ...acc, [key]: value };
      }
    },
    {} as FormatSpecifierObject
  );
  console.log(
    "Logged output --> ~ file: ChartValueFormatters.tsx ~ line 72 ~ formatSpecifier",
    formatSpecifier
  );

  const updateFormat = useCallback(
    (property: keyof FormatSpecifier, propertyValue: any) => {
      const updatedFormatSpecifier = new FormatSpecifier({
        ...(formatSpecifier as FormatSpecifierObject),
        [property]: propertyValue,
      });

      setFormatValue({
        format: updatedFormatSpecifier.toString(),
        enabled: formatValue.enabled,
      });
    },
    [formatSpecifier, setFormatValue, formatValue.enabled]
  );

  const handleTypeChange = (option: IExtendedSelectOption) => {
    updateFormat("type", option.value);
  };

  const handleFillChange = (e: React.ChangeEvent<any>) => {
    updateFormat("fill", e.target.value.slice(1));
  };

  const handleAlignChange = (option: IExtendedSelectOption) => {
    updateFormat("align", option.value);
  };

  const handleSignChange = (option: IExtendedSelectOption) => {
    updateFormat("sign", option.value);
  };

  const handleSymbolChange = (option: IExtendedSelectOption) => {
    updateFormat("symbol", option.value);
  };

  const handleZeroChange = (event: React.ChangeEvent<any>, flag?: boolean) => {
    console.log(
      "Logged output --> ~ file: ChartValueFormatters.tsx ~ line 113 ~ handleZeroChange ~ flag",
      flag
    );
    updateFormat("zero", flag);
  };

  const handleWidthChange = (e: React.ChangeEvent<any>) => {
    updateFormat("width", e.target.value);
  };

  const handleCommaChange = (event: React.ChangeEvent<any>, flag?: boolean) => {
    updateFormat("comma", flag);
  };

  const handlePrecisionChange = (e: React.ChangeEvent<any>) => {
    updateFormat("precision", e.target.value);
  };

  const handleTrimChange = (event: React.ChangeEvent<any>, flag?: boolean) => {
    updateFormat("trim", flag);
  };

  const ChartSwitchSubFormatters = ({
    title,
    name,
    value,
    handleChange,
  }: IChartSwitchSubFormatters) => {
    console.log(
      "Logged output --> ~ file: ChartValueFormatters.tsx ~ line 139 ~ value",
      value
    );
    return (
      <AnalyticsComp
        title={title}
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <ApexMuiSwitch
            name={name}
            handleChange={handleChange}
            checked={value}
            checkedColor={theme.palette.success.main}
            notCheckedColor={theme.palette.secondary.main}
            hasLabels={true}
            leftLabel="Disable"
            rightLabel="Enable"
          />
        }
      />
    );
  };

  const ChartInputSubFormatters = ({
    title,
    name,
    handleChange,
  }: IChartInputSubFormatters) => {
    return (
      <AnalyticsComp
        title={title}
        direction="Vertical"
        containerStyle={{ marginTop: 20 }}
        content={
          <Input value={formatSpecifier[name]} onChange={handleChange} />
        }
      />
    );
  };

  const ChartSelectSubFormatters = ({
    title,
    name,
    valueOptions,
    handleChange,
  }: IChartSelectSubFormatters) => {
    return (
      <AnalyticsComp
        title={title}
        direction="Vertical"
        containerStyle={{ marginTop: 20, width: 130 }}
        contentStyle={{ width: 130 }}
        content={
          <ApexSelectRS
            valueOption={
              valueOptions.find(
                (option) => option.value === formatSpecifier[name]
              ) as IExtendedSelectOption
            }
            data={valueOptions as IExtendedSelectOption[]}
            handleSelect={(option: ValueType<IExtendedSelectOption, false>) => {
              const optionDefined = option as IExtendedSelectOption;
              handleChange(optionDefined);
            }}
            menuPortalTarget={plotRef?.current as HTMLDivElement}
            // menuPortalTarget={chartValRef?.current as HTMLDivElement}
            isSelectOptionType={true}
            isClearable={false}
            components={{ Option }}
          />
        }
      />
    );
  };

  React.useEffect(() => {
    setValueFormat((prev: any) => ({
      ...prev,
      [axisFormatTitle]: formatValue.format as string,
    }));

    updateParameterAction &&
      dispatch(
        updateParameterAction(
          `${basePath}.${axisFormatTitle}`,
          formatValue.format
        )
      );
  }, [formatValue.format]);

  return (
    <ApexFlexContainer flexDirection="column" moreStyles={{ height: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <Input
          style={{
            width: 130,
            pointerEvents: "none",
            backgroundColor: theme.palette.grey[200],
            border: `1px solid ${theme.palette.primary.main}`,
          }}
          value={formatValue.format}
          readOnly
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditing((flag) => !flag)}
          startIcon={
            isEditing ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />
          }
        >
          {`${isEditing ? "close" : "open"} options`}
        </Button>
      </div>
      {isEditing && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ChartSelectSubFormatters
            title="Type"
            name="type"
            valueOptions={valueTypeOptions}
            handleChange={handleTypeChange}
          />
          <ChartSelectSubFormatters
            title="Sign"
            name="sign"
            valueOptions={valueSignOptions}
            handleChange={handleSignChange}
          />
          <ChartSelectSubFormatters
            title="Symbol"
            name="symbol"
            valueOptions={valueSymbolOptions}
            handleChange={handleSymbolChange}
          />
          <ChartInputSubFormatters
            title="Precision"
            name="precision"
            handleChange={handlePrecisionChange}
          />
          <ChartInputSubFormatters
            title="Width"
            name="width"
            handleChange={handleWidthChange}
          />
          <ChartInputSubFormatters
            title="Fill"
            name="fill"
            handleChange={handleFillChange}
          />
          <ChartSelectSubFormatters
            title="Align"
            name="align"
            valueOptions={valueAlignOptions}
            handleChange={handleAlignChange}
          />
          <ChartSwitchSubFormatters
            title="Zero-padding"
            name="zero"
            value={typeof formatSpecifier.zero === "string" ? true : false}
            handleChange={handleZeroChange}
          />
          <ChartSwitchSubFormatters
            title="Comma"
            name="comma"
            value={Boolean(formatSpecifier.comma)}
            handleChange={handleCommaChange}
          />
          <ChartSwitchSubFormatters
            title="Trim"
            name="trim"
            value={Boolean(formatSpecifier.trim)}
            handleChange={handleTrimChange}
          />
        </div>
      )}
    </ApexFlexContainer>
  );
};

export default React.memo(ChartValueFormatters);
