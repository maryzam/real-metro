
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
get_coords <- function(source) {
  coords <- strsplit(as.character(source), "/")
  coords <- unlist(coords)[3]
  coords <- unlist(strsplit(coords, "; "))
  lat <- parse_number(coords[1])
  lon <- parse_number(coords[2])
  return(c(lat,lon))
}

stations <- stations %>%
            rowwise() %>% 
            mutate(Lat = get_coords(Coords)[1]) %>%
            mutate(Lon = get_coords(Coords)[2])

stations <- stations[, !(colnames(stations) == "Coords") ]

write.csv(stations, file = "data/moscow.csv", fileEncoding = "UTF-8")