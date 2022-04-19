let PopularAnimeQuery = `
	query($perPage: Int) {
		Page(perPage: $perPage) {
			media(sort : POPULARITY_DESC, type: ANIME) {
				title {
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
	query($perPage: Int) {
		Page(perPage: $perPage) {
			media (sort :TRENDING_DESC, type : ANIME){
				title {
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
	query($perPage: Int) {
		Page(perPage: $perPage) {
			media (sort :SCORE_DESC, type : ANIME){
				title {
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
