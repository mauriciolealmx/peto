# Test sent updated by checking the history
# Just update the start and end time.
aws location \
  get-device-position-history \
    --device-id "device-1" \
    --start-time-inclusive "2022-12-04T18:10:00.327Z" \
    --end-time-exclusive "2022-12-04T19:00:00.327Z" \
    --tracker-name "example-tracker"