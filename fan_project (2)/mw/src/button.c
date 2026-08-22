/* Button service: samples the switch pins through the same GPIO driver and debounces them. */

#include <stdio.h>

#include "button.h"
#include "hal_gpio.h"

#define DEBOUNCE_SAMPLES  3U

static const HalGpioPin_t button_pin[BUTTON_ID_COUNT] =
{
  HAL_GPIO_PIN_SW_POWER,
  HAL_GPIO_PIN_SW_HIGH,
  HAL_GPIO_PIN_SW_LOW,
  HAL_GPIO_PIN_SW_TIMER
};

static const char *p_button_name[BUTTON_ID_COUNT] =
{
  "power",
  "high",
  "low",
  "timer"
};

static HalGpioLevel_t stable_level[BUTTON_ID_COUNT];
static uint8_t same_samples[BUTTON_ID_COUNT];
static bool press_pending[BUTTON_ID_COUNT];

void Button_Init(void)
{
  ButtonId_t id;

  for (id = BUTTON_ID_POWER; id < BUTTON_ID_COUNT; id++)
  {
    stable_level[id] = HAL_GPIO_LOW;
    same_samples[id] = 0U;
    press_pending[id] = false;
  }

  printf("[MW/BUTTON] init, %u switches on the GPIO driver\n", (unsigned int)BUTTON_ID_COUNT);
}

void Button_Tick(void)
{
  ButtonId_t id;
  HalGpioLevel_t level;

  for (id = BUTTON_ID_POWER; id < BUTTON_ID_COUNT; id++)
  {
    level = HalGpio_ReadPin(button_pin[id]);

    if (level == stable_level[id])
    {
      same_samples[id] = 0U;
      continue;
    }

    same_samples[id]++;
    if (same_samples[id] < DEBOUNCE_SAMPLES)
    {
      continue; /* not stable yet, ignore the bounce */
    }

    same_samples[id] = 0U;
    stable_level[id] = level;

    if (level == HAL_GPIO_HIGH)
    {
      press_pending[id] = true;
      printf("[MW/BUTTON] %s pressed\n", p_button_name[id]);
    }
  }
}

bool Button_TakePress(ButtonId_t id)
{
  if (id >= BUTTON_ID_COUNT)
  {
    return false;
  }

  if (press_pending[id] == false)
  {
    return false;
  }

  press_pending[id] = false;

  return true;
}
