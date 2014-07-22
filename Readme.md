MovieStore
==========

It's a command line utility to import and query MovieLens data.

Conditions:
* Data needs to be imported into a local leveldb database. Key/schema design is totally up to you.
* Import export happens through different modes of same command-line utility. (Using different parameters)

Specs:
------

Milestone 1:

`-i <movies_file> <tags_file> <ratings_file>` // Import MovieLens dataset
`-u <user_id> (--movies | --tags)`  // Display list of movies rated or tagged by specified user
`-m (--popular | --best) [-n <number_of_ratings>]`  // Display n number of most popular (most rated on) or best rated (highest average rating) movies
