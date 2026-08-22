/* Serial command service: one console line becomes either a simulated switch press or a value command. */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "hal_gpio.h"
#include "hal_uart.h"
#include "serial_if.h"

#define LINE_SIZE  32U

static void PrintHelp(void);
static bool ParseSeconds(const char *p_text, uint32_t *p_seconds);

void SerialIf_Init(void)
{
  HalUart_Init(115200U);
  PrintHelp();
}

bool SerialIf_Poll(void)
{
  char line[LINE_SIZE];
  uint32_t seconds;

  if (HalUart_ReadLine(line, (uint16_t)LINE_SIZE) == false)
  {
    return false;
  }

  if (strcmp(line, "") == 0)
  {
    return true;
  }

  if (strcmp(line, "sw1") == 0)
  {
    HalGpio_SimPress(HAL_GPIO_PIN_SW_POWER);
  }
  else if (strcmp(line, "sw_high") == 0)
  {
    HalGpio_SimPress(HAL_GPIO_PIN_SW_HIGH);
  }
  else if (strcmp(line, "sw_low") == 0)
  {
    HalGpio_SimPress(HAL_GPIO_PIN_SW_LOW);
  }
  else if (strncmp(line, "sw_timer", 8) == 0)
  {
    if (ParseSeconds(&line[8], &seconds) != false)
    {
      SerialIf_OnTimerCommand(seconds);
      HalGpio_SimPress(HAL_GPIO_PIN_SW_TIMER);
    }
    else
    {
      HalUart_WriteLine("usage: sw_timer <seconds>");
    }
  }
  else if (strcmp(line, "help") == 0)
  {
    PrintHelp();
  }
  else if (strcmp(line, "quit") == 0)
  {
    return false;
  }
  else
  {
    HalUart_WriteLine("unknown command, type help");
  }

  return true;
}

/* Default hook. The application defines its own version and this one is dropped at link time. */
__attribute__((weak)) void SerialIf_OnTimerCommand(uint32_t seconds)
{
  (void)seconds;
  HalUart_WriteLine("no application handler for sw_timer");
}

static void PrintHelp(void)
{
  HalUart_WriteLine("commands: sw1 | sw_high | sw_low | sw_timer <seconds> | help | quit");
}

static bool ParseSeconds(const char *p_text, uint32_t *p_seconds)
{
  char *p_end;
  unsigned long value;

  value = strtoul(p_text, &p_end, 10);
  if (p_end == p_text)
  {
    return false;
  }

  if (value > 3600UL)
  {
    return false;
  }

  *p_seconds = (uint32_t)value;

  return true;
}
