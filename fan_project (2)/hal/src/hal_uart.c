/* Dummy UART driver: the console replaces the real peripheral. */

#include <stdio.h>
#include <string.h>

#include "hal_uart.h"

void HalUart_Init(uint32_t baud_rate)
{
  printf("[HAL/UART ] init %lu baud (simulated on the console)\n", (unsigned long)baud_rate);
}

void HalUart_WriteLine(const char *p_text)
{
  if (p_text == NULL)
  {
    return;
  }

  printf("[HAL/UART ] tx: %s\n", p_text);
}

bool HalUart_ReadLine(char *p_buffer, uint16_t size)
{
  size_t length;

  if ((p_buffer == NULL) || (size < 2U))
  {
    return false;
  }

  printf("fan> ");
  (void)fflush(stdout);

  if (fgets(p_buffer, (int)size, stdin) == NULL)
  {
    return false; /* end of input, the same as a disconnected terminal */
  }

  length = strlen(p_buffer);
  while ((length > 0U) && ((p_buffer[length - 1U] == '\n') || (p_buffer[length - 1U] == '\r')))
  {
    p_buffer[length - 1U] = '\0';
    length--;
  }

  return true;
}
