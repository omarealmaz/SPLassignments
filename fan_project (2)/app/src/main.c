/* Entry point: initialise every layer, then run the scan loop. */

#include "button.h"
#include "fan_logic.h"
#include "hal_gpio.h"
#include "hal_timer.h"
#include "relay_ctrl.h"
#include "serial_if.h"

#define SCAN_SAMPLES  10U   /* on real hardware a 10 ms timer calls Button_Tick instead */

static void ScanButtons(void);

int main(void)
{
  HalGpio_Init();
  HalTimer_Init();
  SerialIf_Init();
  RelayCtrl_Init();
  Button_Init();
  FanLogic_Init();

  while (SerialIf_Poll() != false)
  {
    ScanButtons();
    FanLogic_Run();
  }

  return 0;
}

static void ScanButtons(void)
{
  uint32_t sample;

  for (sample = 0U; sample < SCAN_SAMPLES; sample++)
  {
    Button_Tick();
  }
}
