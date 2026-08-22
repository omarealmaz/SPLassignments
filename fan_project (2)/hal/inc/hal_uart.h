#ifndef HAL_UART_H
#define HAL_UART_H

#include <stdbool.h>
#include <stdint.h>

void HalUart_Init(uint32_t baud_rate);
void HalUart_WriteLine(const char *p_text);
bool HalUart_ReadLine(char *p_buffer, uint16_t size);

#endif /* HAL_UART_H */
