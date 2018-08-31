
library('rvest')

Sys.setlocale("LC_CTYPE", "russian")

url <- "https://en.wikipedia.org/wiki/List_of_Moscow_Metro_stations"
page <- read_html(url, encoding="UTF-8")

stations <- page %>%
  html_node("table.sortable") %>%
  html_table(header = FALSE)

names(stations) <- c("Line", "Name", "OriginName", "Transfer", "Opened", "Elev.", "Type", "Coords", "Pic")

dropped <- c("Type", "Pic", "Transfer")
stations <- stations[-c(1), !(colnames(stations) %in% dropped) ]