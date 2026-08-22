/* Dummy GPIO driver: pin levels are printed instead of driven, and inputs come from the simulator. */

#include <stdio.h>

#include "hal_gpio.h"

#define SIM_PRESS_SAMPLES  5U   /* how many samples a simulated press stays active */

static const char *p_pin_name[HAL_GPIO_PIN_COUNT] =
{
  "PA5/RELAY",
  "PA6/SPEED",
  "PB0/SW_POWER",
  "PB1/SW_HIGH",
  "PB2/SW_LOW",
  "PB3/SW_TIMER"
};

static HalGpioLevel_t output_level[HAL_GPIO_PIN_COUNT];
static uint8_t press_samples[HAL_GPIO_PIN_COUNT];

void HalGpio_Init(void)
{
  HalGpioPin_t pin;

  for (pin = HAL_GPIO_PIN_RELAY; pin < HAL_GPIO_PIN_COUNT; pin++)
  {
    output_level[pin] = HAL_GPIO_LOW;
    press_samples[pin] = 0U;
  }

  printf("[HAL/GPIO ] init: 2 outputs, 3 inputs\n");
}

void HalGpio_WritePin(HalGpioPin_t pin, HalGpioLevel_t level)
{
  if (pin >= HAL_GPIO_PIN_COUNT)
  {
    return;
  }

  if (output_level[pin] != level)
  {
    output_level[pin] = level;
    printf("[HAL/GPIO ] %-12s = %s\n", p_pin_name[pin], (level == HAL_GPIO_HIGH) ? "HIGH" : "LOW");
  }
}

HalGpioLevel_t HalGpio_ReadPin(HalGpioPin_t pin)
{
  if (pin >= HAL_GPIO_PIN_COUNT)
  {
    return HAL_GPIO_LOW;
  }

  if (press_samples[pin] > 0U)
  {
    press_samples[pin]--; /* the simulated finger lets go after a few samples */
    return HAL_GPIO_HIGH;
  }

  return HAL_GPIO_LOW;
}

void HalGpio_SimPress(HalGpioPin_t pin)
{
  if (pin < HAL_GPIO_PIN_COUNT)
  {
    press_samples[pin] = SIM_PRESS_SAMPLES;
  }
}
