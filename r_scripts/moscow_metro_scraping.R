
library('rvest')
library('readr')

Sys.setlocale("LC_CTYPE", "russian")

url <- "https://en.wikipedia.org/wiki/List_of_Moscow_Metro_stations"
page <- read_html(url, encoding="UTF-8")

stations <- page %>%
  html_node("table.sortable") %>%
  html_table(header = FALSE)

names(stations) <- c("Line", "Name", "OriginName", "Transfer", "Opened", "Elev", "Type", "Coords", "Pic")

dropped <- c("Type", "Pic", "Transfer")
stations <- stations[-c(1), !(colnames(stations) %in% dropped) ]

stations$Line <- gsub("\u2009", "", stations$Line)
stations$Elev <- parse_number(gsub("\u2212", "-", stations$Elev))

#parse coords
stations <- stations %>%
  mutate(Coords2 = unlist(strsplit(Coords, "/"))[3]) %>%
  mutate(Lat = parse_number(unlist(strsplit(Coords2, "; "))[1])) %>%
  mutate(Lon = parse_number(unlist(strsplit(Coords2, "; "))[2]))

dropped <- c("Coords", "Coords2")
stations <- stations[-c(1), !(colnames(stations) %in% dropped) ]