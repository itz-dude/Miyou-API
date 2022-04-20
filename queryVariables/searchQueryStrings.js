let PopularAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort : POPULARITY_DESC, type: ANIME) {
				title {
					romaji
					english
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				
			}
		}
	}
`;

let TrendingAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :TRENDING_DESC, type : ANIME){
				title {
					romaji
					english
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				
			}
		}
	}
`;

let top100AnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :SCORE_DESC, type : ANIME){
				title {
					romaji
					english
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				
			}
		}
	}
`;

let favouritesAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort: FAVOURITES_DESC) {
				title {
					romaji
					english
				}
				bannerImage
				coverImage {
					medium
					large
					extraLarge
				}
				description
				episodes
			}
		}
	}
`;

exports.PopularAnimeQuery = PopularAnimeQuery;
exports.TrendingAnimeQuery = TrendingAnimeQuery;
exports.top100AnimeQuery = top100AnimeQuery;
exports.favouritesAnimeQuery = favouritesAnimeQuery;
