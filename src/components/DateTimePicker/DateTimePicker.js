import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ct from "countries-and-timezones"; // has proper IANA data for dates and times with dst and utc offsets
import moment from "moment";
import styled from "styled-components";

import {
  DatePicker,
  DatePickerInput,
  FormItem,
  FormLabel,
  SelectItem,
  TimePicker,
  TimePickerSelect,
} from "carbon-components-react";

import { HelperText } from "components";
import { isEmpty, isDate, isTime, parseDate } from "lib/utils";

// from https://www.npmjs.com/package/compact-timezone-list
const minimalTimezoneSet = [
  { offset: "-11:00", label: "(GMT-11:00) Pago Pago", tzCode: "Pacific/Pago_Pago" },
  { offset: "-10:00", label: "(GMT-10:00) Hawaii Time", tzCode: "Pacific/Honolulu" },
  { offset: "-10:00", label: "(GMT-10:00) Tahiti", tzCode: "Pacific/Tahiti" },
  { offset: "-09:00", label: "(GMT-09:00) Alaska Time", tzCode: "America/Anchorage" },
  { offset: "-08:00", label: "(GMT-08:00) Pacific Time", tzCode: "America/Los_Angeles" },
  { offset: "-07:00", label: "(GMT-07:00) Mountain Time", tzCode: "America/Denver" },
  { offset: "-06:00", label: "(GMT-06:00) Central Time", tzCode: "America/Chicago" },
  { offset: "-05:00", label: "(GMT-05:00) Eastern Time", tzCode: "America/New_York" },
  { offset: "-04:00", label: "(GMT-04:00) Atlantic Time - Halifax", tzCode: "America/Halifax" },
  { offset: "-03:00", label: "(GMT-03:00) Buenos Aires", tzCode: "America/Argentina/Buenos_Aires" },
  { offset: "-02:00", label: "(GMT-02:00) Sao Paulo", tzCode: "America/Sao_Paulo" },
  { offset: "-01:00", label: "(GMT-01:00) Azores", tzCode: "Atlantic/Azores" },
  { offset: "+00:00", label: "(GMT+00:00) London", tzCode: "Europe/London" },
  { offset: "+01:00", label: "(GMT+01:00) Berlin", tzCode: "Europe/Berlin" },
  { offset: "+02:00", label: "(GMT+02:00) Helsinki", tzCode: "Europe/Helsinki" },
  { offset: "+03:00", label: "(GMT+03:00) Istanbul", tzCode: "Europe/Istanbul" },
  { offset: "+04:00", label: "(GMT+04:00) Dubai", tzCode: "Asia/Dubai" },
  { offset: "+04:30", label: "(GMT+04:30) Kabul", tzCode: "Asia/Kabul" },
  { offset: "+05:00", label: "(GMT+05:00) Maldives", tzCode: "Indian/Maldives" },
  { offset: "+05:30", label: "(GMT+05:30) India Standard Time", tzCode: "Asia/Calcutta" },
  { offset: "+05:45", label: "(GMT+05:45) Kathmandu", tzCode: "Asia/Kathmandu" },
  { offset: "+06:00", label: "(GMT+06:00) Dhaka", tzCode: "Asia/Dhaka" },
  { offset: "+06:30", label: "(GMT+06:30) Cocos", tzCode: "Indian/Cocos" },
  { offset: "+07:00", label: "(GMT+07:00) Bangkok", tzCode: "Asia/Bangkok" },
  { offset: "+08:00", label: "(GMT+08:00) Hong Kong", tzCode: "Asia/Hong_Kong" },
  { offset: "+08:30", label: "(GMT+08:30) Pyongyang", tzCode: "Asia/Pyongyang" },
  { offset: "+09:00", label: "(GMT+09:00) Tokyo", tzCode: "Asia/Tokyo" },
  { offset: "+09:30", label: "(GMT+09:30) Central Time - Darwin", tzCode: "Australia/Darwin" },
  { offset: "+10:00", label: "(GMT+10:00) Eastern Time - Brisbane", tzCode: "Australia/Brisbane" },
  { offset: "+10:30", label: "(GMT+10:30) Central Time - Adelaide", tzCode: "Australia/Adelaide" },
  {
    offset: "+11:00",
    label: "(GMT+11:00) Eastern Time - Melbourne, Sydney",
    tzCode: "Australia/Sydney",
  },
  { offset: "+12:00", label: "(GMT+12:00) Nauru", tzCode: "Pacific/Nauru" },
  { offset: "+13:00", label: "(GMT+13:00) Auckland", tzCode: "Pacific/Auckland" },
  { offset: "+14:00", label: "(GMT+14:00) Kiritimati", tzCode: "Pacific/Kiritimati" },
];

// is this date a dst date?
const isDST = (date) => {
  let dst = false;
  try {
    dst = moment(date).isDST();
  } catch (e) {
    // do nothing
  }
  return dst;
};

// guess the users timezone
const getTimezone = () => {
  let tz;
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    // do nothing
  }
  return tz;
};

const DateTimePickerRow = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  & .bx--form-item:first-child {
    margin-right: 1.5rem;
  }
  & .bx--select.bx--time-picker__select {
    width: auto;
  }
`;

const DateTimePicker = ({
  dateFormat,
  dateLabelText,
  datePickerType,
  datePlaceholder,
  dropDownLabelText,
  format,
  helperText,
  id,
  invalid,
  invalidText,
  initialize,
  keepOffset,
  labelText,
  locale,
  maxDate,
  meridiems,
  meridiemsPlaceholder,
  minDate,
  name,
  onBlur,
  onChange,
  result,
  required,
  timePickerPattern,
  timePickerLabelText,
  timezones,
  timezonesPlaceholder,
  today,
  value,
  ...rest
}) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [meridiem, setMeridiem] = useState();
  const [timezone, setTimezone] = useState();
  const [errors, setErrors] = useState(new Set());

  useEffect(() => {
    let now = today || moment().startOf("day");
    let d = date,
      t = time,
      r,
      z;
    if (value && !isEmpty(value)) {
      let m = parseDate(value);
      d = m.format("MM/DD/YYYY");
      t = m.format("h:mm");
      r = m.format("A") || meridiems[0] || "AM";
      z = (getTimeZoneOffsetForDate(m) || {}).text;
    } else if (initialize) {
      r = meridiems[0] || "AM";
      z = (getTimeZoneOffsetForDate(now) || {}).text;
      if (!date && minDate) d = moment(minDate).format("MM/DD/YYYY");
      if (!time) t = "00:00";
    } else {
      r = meridiems[0] || "AM";
      z = (getTimeZoneOffsetForDate(now) || {}).text;
    }
    // console.log('d',d,date,d !== date,'\nt',t,time,t !== time,'\nr',r,meridiem,r !== meridiem,'\nz',z,timezone,z !== timezone);
    if (d !== date) {
      setDate(d);
      document.getElementById(`${id || name}_date`).value = d; // hack
    }
    if (t !== time) {
      setTime(t);
      document.getElementById(`${id || name}_time`).value = t; // hack
    }
    if (r !== meridiem) {
      setMeridiem(r);
      document.getElementById(`${id || name}_timeMeridiem`).value = r; // hack
    }
    if (z !== timezone) {
      setTimezone(z);
      document.getElementById(`${id || name}_timeTimeZone`).value = z; // hack
    }
  }, [value]);

  useEffect(() => {
    let z = getTimeZoneOffsetForDate(date || new Date());
    let tz = date && isDST(date) ? z.dstOffset : z.utcOffset;
    let fv = `${date} ${time || "0:00"}:00 ${meridiem || "AM"} ${tz}`;
    let dt = parseDate(fv);
    let rdt = dt.toDate();
    let idt = dt.toISOString(keepOffset);
    let udt = moment(dt).utc().format(format);
    let data = {
      iso: idt,
      // string: fv,
      raw: rdt,
      utc: udt,
      value: dt,
    };
    // console.log("useEffect data", data, date, time, meridiem, timezone, tz);
    if (dt && dt.isValid()) {
      if (onChange && typeof onChange === "function") onChange(name, data[result]);
      if (onBlur && typeof onBlur === "function") onBlur(name, data[result]);
    }
  }, [date, time, meridiem, timezone]);

  const onDateChange = (e) => {
    let v = (e && e.target && e.target.value) || null;
    let errs = new Set([...errors]);
    if (isDate(v)) errs.delete("date");
    else errs.add("date");
    setErrors(errs);
    setDate(v);
  };

  const onTimeChange = (e) => {
    let v = (e && e.target && e.target.value) || null;
    let errs = new Set([...errors]);
    if (isTime(v)) errs.delete("time");
    else if (v && Number.isInteger(v / 1)) {
      if (v.indexOf(":") === -1) {
        if (v.length < 3) v += ":00";
        else {
          let parts = v.split("");
          parts.splice(parts.length - 2, 0, ":");
          v = parts.join("");
        }
      }
      if (isTime(v)) errs.delete("time");
      else errs.add("time");
    } else errs.add("time");
    setErrors(errs);
    setTime(v);
  };

  const onMeridiemChange = (e) => {
    let v = (e && e.target && e.target.value) || null;
    let errs = new Set([...errors]);
    if (isEmpty(v)) errs.add("meridiem");
    else errs.delete("meridiem");
    setErrors(errs);
    setMeridiem(v);
  };

  const onTimeZoneChange = (e) => {
    let v = (e && e.target && e.target.value) || null;
    let errs = new Set([...errors]);
    if (isEmpty(v)) errs.add("timezone");
    else errs.delete("timezone");
    setErrors(errs);
    setTimezone(v);
  };

  // get the timezone data for this date
  const getTimeZoneOffsetForDate = (o) => {
    if (!timezones) return {};
    let m, t, z;
    if (!o) {
      z = (getTimezone() || "").toLowerCase(); // guess the browser tz
      t = timezones.find((i) => i && i.text.toLowerCase() === z);
      return t;
    }
    try {
      if (timezone) z = timezones.find((i) => i && i.text === timezone);
      else {
        m = moment(o);
        t = m.format("ZZ");
        z = isDST(o)
          ? timezones.find((i) => i && i.dstOffset === t)
          : timezones.find((i) => i && i.utcOffset === t);
      }
    } catch (e) {
      return {};
    }
    // console.log("getTimeZoneOffsetForDate", z);
    return z || {};
  };

  return (
    <FormItem {...rest}>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      <DateTimePickerRow>
        <DatePicker
          id={id || name}
          key={id || name}
          name={name || id}
          dateFormat={dateFormat}
          datePickerType={datePickerType}
          minDate={moment(minDate).format("MM/DD/YYYY")}
          maxDate={moment(maxDate).format("MM/DD/YYYY")}
          locale={locale}
          required={required}>
          <DatePickerInput
            id={`${id || name}_date`}
            key={`${id || name}_date`}
            name={`${name || id}_date`}
            labelText={dateLabelText}
            placeholder={datePlaceholder}
            onBlur={onDateChange}
            onChange={onDateChange}
            invalid={invalid || errors.has("date")}
            value={date}
          />
        </DatePicker>
        <TimePicker
          id={`${id || name}_time`}
          key={`${id || name}_time`}
          name={`${name || id}_time`}
          pattern={timePickerPattern}
          hideLabel={false}
          labelText={timePickerLabelText}
          onBlur={onTimeChange}
          invalid={(invalid && !time) || errors.has("time")}
          invalidText={invalidText}
          value={time}
          placeholder="hh:mm"
          required={required}>
          <TimePickerSelect
            id={`${id || name}_timeMeridiem`}
            key={`${id || name}_timeMeridiem`}
            name={`${name || id}_timeMeridiem`}
            labelText={dropDownLabelText}
            onChange={onMeridiemChange}
            invalid={errors.has("meridiem")}
            defaultValue={meridiem || meridiemsPlaceholder}>
            <SelectItem
              disabled={true}
              hidden={false}
              text={meridiemsPlaceholder}
              value={meridiemsPlaceholder}
            />
            {meridiems.map((o, i) => (
              <SelectItem key={i} disabled={false} hidden={false} text={o} value={o} />
            ))}
          </TimePickerSelect>
          <TimePickerSelect
            id={`${id || name}_timeTimeZone`}
            key={`${id || name}_timeTimeZone`}
            name={`${name || id}_timeTimeZone`}
            labelText={dropDownLabelText}
            onChange={onTimeZoneChange}
            invalid={errors.has("timezone")}
            defaultValue={timezone || (getTimeZoneOffsetForDate(date) || {}).text}>
            <SelectItem
              disabled={true}
              hidden={false}
              text={timezonesPlaceholder}
              value={timezonesPlaceholder}
            />
            {timezones.map((o, i) => (
              <SelectItem key={i} disabled={false} hidden={false} text={o.text} value={o.text} />
            ))}
          </TimePickerSelect>
        </TimePicker>
      </DateTimePickerRow>
      {helperText ? <HelperText className="bx--label" source={helperText} /> : null}
    </FormItem>
  );
};

DateTimePicker.defaultProps = {
  dateFormat: "m/d/Y",
  dateLabelText: "Select a date",
  datePickerType: "single",
  datePlaceholder: "mm/dd/yyyy",
  dropDownClassName: "bx--time-picker__select",
  dropDownLabelText: "",
  id: "datetimepicker",
  initialize: false,
  keepOffset: false,
  labelText: "",
  locale: "en",
  meridiems: ["AM", "PM"],
  meridiemsPlaceholder: "Meridiem",
  minDate: undefined,
  maxDate: undefined,
  onChange: () => {},
  result: "iso", // should be using iso
  timePickerLabelText: "Select a time",
  timePickerPattern: "(1[012]|[1-9]):[0-5][0-9](s)?",
  timePickerPlaceholder: "",
  timezones: minimalTimezoneSet.map((tz) => {
    let c = ct.getTimezone(tz.tzCode); // get the real data for the tzcode
    let d = c.dstOffsetStr.replace(":", ""); // strip the : for isodatetime lookups
    let u = c.utcOffsetStr.replace(":", ""); // strip the : for isodatetime lookups
    return { dstOffset: d || u, utcOffset: u || d, text: tz.tzCode }; // return the dst and utc with the tz for proper offsets
  }),
  timezonesPlaceholder: "Timezone",
  today: moment().format("MM/DD/YYYY"),
  value: null,
};

DateTimePicker.propTypes = {
  dateFormat: PropTypes.string,
  dateLabelText: PropTypes.string,
  datePickerType: PropTypes.string,
  datePlaceholder: PropTypes.string,
  dropDownLabelText: PropTypes.string,
  format: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  initialize: PropTypes.bool,
  keepOffset: PropTypes.bool,
  labelText: PropTypes.string,
  locale: PropTypes.string,
  maxDate: PropTypes.any,
  meridiems: PropTypes.array,
  meridiemsPlaceholder: PropTypes.string,
  minDate: PropTypes.any,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  result: PropTypes.string,
  required: PropTypes.bool,
  timePickerPattern: PropTypes.string,
  timePickerLabelText: PropTypes.string,
  timezones: PropTypes.any,
  timezonesPlaceholder: PropTypes.string,
  today: PropTypes.string,
  value: PropTypes.any,
};

export default DateTimePicker;
