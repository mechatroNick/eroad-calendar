import React, { Fragment, Component, PureComponent } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  ToggleBadge
} from "../design system";
import Modal from "react-responsive-modal";
import DayBox from './DayBox'
import DaysOfWeekIndicator from './DaysOfWeekIndicator'
import { TYPE_OF_EVENTS } from "../logic/constant";

class DayBoxGroup extends PureComponent {
  state = {
    showModal: false,
    date: undefined,
    month: undefined,
    year: undefined,
    today: false,
    specialEvent: TYPE_OF_EVENTS.NOTHING_SPECIAL
  };

  componentWillMount() {
    const { fullDate, eventList } = this.props;
    const date = parseInt(fullDate.substring(8, 10));
    const month = parseInt(fullDate.substring(5, 7));
    const year = parseInt(fullDate.substring(0, 4));
    let initialState = { date: date, month: month, year: year };

    if (eventList) {
      let indexToday = eventList.indexOf(TYPE_OF_EVENTS.TODAY_DATE);
      if (indexToday !== -1) {
        initialState = { ...initialState, today: true };
        console.log(eventList);
      }

      if (eventList.length > 1) {
        console.log(eventList);
        initialState = { ...initialState, specialEvent: eventList[1] };
      }
    }

    this.setState(initialState);
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChangeTypeOfSpecialEvent = event => {
    const newSpecialEvent = event.target.name;
    const currentSpecialEvent = this.props.specialEvent;
    const { fullDate } = this.props;
    if (newSpecialEvent !== currentSpecialEvent) {
      // this.setState({ specialEvent: newSpecialEvent });
      const payload = { target: { name: newSpecialEvent, date: fullDate } };
      this.props.onChangeSpecialEvent(payload);
    }
  };

  render() {
    const { fullDate, eventList } = this.props;
    const { showModal, today, date, month, year } = this.state;

    let specialEvent = TYPE_OF_EVENTS.NOTHING_SPECIAL;

    if (eventList) {
      let indexToday = eventList.indexOf(TYPE_OF_EVENTS.TODAY_DATE);
      if (indexToday !== -1) {
        if (eventList.length > 1) {
          specialEvent = eventList[1];
        }
      } else {
        if (eventList.length > 0) {
          specialEvent = eventList[0];
        }
      }
    }

    return (
      <Fragment>
        <Box my={1} width={1 / 70} />
        <DayBox
          py={[1, 2, 2, 3]}
          my={1}
          width={8 / 70}
          key={fullDate}
          onClick={this.handleOpenModal}
          specialEvent={specialEvent}
        >
          <Text bold={today === true} underline={today === true}>
            {date}
          </Text>
        </DayBox>
        <Box my={1} width={1 / 70} />
        <Modal open={showModal} onClose={this.handleCloseModal} center>
          <Text mt={[4]} textAlign={"center"}>
            Which special day is it?
          </Text>
          <Text my={[2]} textAlign={"center"}>
            {date + "/" + month + "/" + year}
          </Text>
          <ToggleBadge
            date={fullDate}
            name={TYPE_OF_EVENTS.NOTHING_SPECIAL}
            selected={specialEvent === TYPE_OF_EVENTS.NOTHING_SPECIAL}
            bold={specialEvent === TYPE_OF_EVENTS.NOTHING_SPECIAL}
            color={"white"}
            unSelectedColor={"black"}
            bg={"darkGray"}
            unSelectedBg={"borderGray"}
            display={"block"}
            fontSize={[2, 2, 3, 3]}
            onClick={this.handleChangeTypeOfSpecialEvent}
          >
            Nothing special
          </ToggleBadge>
          <ToggleBadge
            date={fullDate}
            name={TYPE_OF_EVENTS.HOLIDAY}
            selected={specialEvent === TYPE_OF_EVENTS.HOLIDAY}
            bold={specialEvent === TYPE_OF_EVENTS.HOLIDAY}
            color={"white"}
            unSelectedColor={"black"}
            bg={"darkGreen"}
            unSelectedBg={"lightGreen"}
            display={"block"}
            fontSize={[2, 2, 3, 3]}
            onClick={this.handleChangeTypeOfSpecialEvent}
          >
            Holiday
          </ToggleBadge>
          <ToggleBadge
            date={fullDate}
            name={TYPE_OF_EVENTS.BUSY}
            selected={specialEvent === TYPE_OF_EVENTS.BUSY}
            bold={specialEvent === TYPE_OF_EVENTS.BUSY}
            color={"white"}
            unSelectedColor={"black"}
            bg={"darkRed"}
            unSelectedBg={"lightRed"}
            display={"block"}
            fontSize={[2, 2, 3, 3]}
            onClick={this.handleChangeTypeOfSpecialEvent}
          >
            Busy
          </ToggleBadge>
          <ToggleBadge
            date={fullDate}
            name={TYPE_OF_EVENTS.BIRTHDAY}
            selected={specialEvent === TYPE_OF_EVENTS.BIRTHDAY}
            bold={specialEvent === TYPE_OF_EVENTS.BIRTHDAY}
            color={"white"}
            unSelectedColor={"black"}
            bg={"darkOrange"}
            unSelectedBg={"lightOrange"}
            display={"block"}
            fontSize={[2, 2, 3, 3]}
            onClick={this.handleChangeTypeOfSpecialEvent}
          >
            Birthday
          </ToggleBadge>
          <ToggleBadge
            date={fullDate}
            name={TYPE_OF_EVENTS.ANNIVERSARY}
            selected={specialEvent === TYPE_OF_EVENTS.ANNIVERSARY}
            bold={specialEvent === TYPE_OF_EVENTS.ANNIVERSARY}
            color={"white"}
            unSelectedColor={"black"}
            bg={"darkPurple"}
            unSelectedBg={"lightPurple"}
            display={"block"}
            fontSize={[2, 2, 3, 3]}
            onClick={this.handleChangeTypeOfSpecialEvent}
          >
            Anniversary
          </ToggleBadge>
        </Modal>
      </Fragment>
    );
  }
}

class MonthCalendar extends PureComponent {
  render() {
    const { month, monthSkeleton, monthEvents, handleUpdateAppStorageOnSpecialEvent } = this.props;
    return (
      <Fragment>
        <Box width={[0.1, 0.025, 1 / 54]} />
        <Flex
          width={[0.8, 0.45, 16 / 54]}
          color={"Black"}
          wrap={true}
          textAlign={"center"}
          align={"center"}
        >
          <Box width={1}>
            <Heading.h3>{month}</Heading.h3>
          </Box>
          <DaysOfWeekIndicator />
          {monthSkeleton.map(fullDate => {
            if (fullDate === "empty") {
              return (
                <Box py={[1, 2, 2, 3]} my={1} color={"white"} width={1 / 7}>
                  *
                </Box>
              );
            } else {
              return (
                <DayBoxGroup
                  key={fullDate}
                  fullDate={fullDate}
                  date={parseInt(fullDate.substring(8, 10))}
                  month={parseInt(fullDate.substring(5, 7))}
                  year={parseInt(fullDate.substring(0, 4))}
                  eventList={monthEvents[fullDate]}
                  onChangeSpecialEvent={
                    handleUpdateAppStorageOnSpecialEvent
                  }
                />
              );
            }
          })}
        </Flex>
        <Box width={[0.1, 0.025, 1 / 54]} />
      </Fragment>
    );
  }
}

export default MonthCalendar;
