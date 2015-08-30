setwd('Documents/data_science/p5/final_project/data')
library(ggplot2)
nh<-read.csv('nh4.2.csv')

ggplot(aes(x=rating),data=nh)+
  geom_histogram()+
  coord_cartesian(xlim=c(0,25))

summary(nh$rating)
nhna <- subset(nh,is.na(rating))

with(subset(nh,created_at[0:3]=='2015'),summary(nh$summary))
