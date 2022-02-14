<template>
  <div class="calend">
    <FullCalendar :options="calendarOptions" :plugins="calendarOptions.plugins" ref="calendar">
      <template v-slot:eventContent='arg'>

        <div class="fullcalendar-tooltip" v-b-tooltip.hover :id="`tooltip-target-event-${arg.event.id}`">
          <div class="fc-event-time">{{ arg.timeText }} </div>
          <div class="fc-event-title fc-sticky">{{ arg.event.title }}</div>
        </div>

        <b-tooltip :target="`tooltip-target-event-${arg.event.id}`" triggers="hover" placement="right">
          Darkmode
        </b-tooltip>
      </template>
    </FullCalendar>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import FullCalendar from '@fullcalendar/vue';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';

  export default {
    components: {
      FullCalendar
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          // height: 'auto',
          // selectable: true,
          // editable:true,
          moreLinkContent:(args) => `+${args.num}`,
          handleWindowResize: true,
          windowResizeDelay: 0,
          initialView: 'dayGridMonth',
          aspectRatio: 2.5,
          eventClick: this.handleEventClick,
          dayMaxEventRows: 4,
          eventTimeFormat: {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
          },
          //  eventBackgroundColor: '#black',
          eventDisplay: 'block',
          events: [
            {
              id: 0,
              title: 'All Day Eventasdad',
              start: new Date(2022, 1, 3),
              backgroundColor: '#8840FB'
            },
             {
              id: 1,
              title: 'All Day Eventasdad',
              start: new Date(2022, 1, 3),
              backgroundColor: '#8840FB'
            },
            {
              id: 2,
              title: 'All Day Eventasdasd',
              start: new Date(2022, 1, 3),
              backgroundColor: '#FFAA00'
            },
            {
              id: 4,
              title: 'All Day Eventasdasd',
              start: new Date(2022, 1, 3),
              backgroundColor: '#00D68F'
            },
            {
              id: 5,
              title: 'All Day Eventasdasd',
              start: new Date(2022, 1, 3),
              backgroundColor: '#3366FF'
            },
            {
              id: 6,
              title: 'All Day Eventasdasd',
              start: new Date(2022, 1, 3),
              backgroundColor: '#FF3D71'
            },
            {
              id: 7,
              title: 'All Day Eventasdasd',
              start: '2022-02-09 21:00',
              backgroundColor: '#FF3D71'
            },
          ]
        },
      }
    },
    computed: {
      ...mapGetters(['sidebarIsActive'])
    },
    watch: {
      sidebarIsActive() {
        setTimeout(() => {
          this.updateSize()
        }, 300)
      }
    },
    methods: {
      updateSize() {
        let api = this.$refs.calendar.getApi();
        if (api) {
          api.updateSize();
        }
      },
      handleEventClick(e) {
        console.log(e);
      },
    },
  }
</script>