import {TOption, TPerformanceContext, TPeriod, TSingleMonthPeriod} from "@/types/PerformanceTypes";
import moment from "moment/moment";

export const periodInitialValue: TPeriod =  {
    start: moment().format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD")
}

export const singleMonthPeriodInitialValue: TSingleMonthPeriod = moment().format("YYYY-MM-DD");

export const performanceContextInitialValue: TPerformanceContext = {
    period: periodInitialValue,
    platform: "Instagram",
    selectedCompetitor: [],
    setPeriod: () => {},
    setPlatform: () => {},
    setSelectedCompetitor: () => {}
};

export const optionInitialValue: TOption = {
    label: "label init",
    value: "value init"
}