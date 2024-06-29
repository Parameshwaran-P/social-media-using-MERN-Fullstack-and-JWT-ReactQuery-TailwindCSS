
import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType }) => {
	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "/api/posts/all";
			case "following":
				return "/api/posts/following";
			default:
				return "/api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();
	const { data: posts, isLoading, refetch, isFetching } = useQuery({
		queryKey: ['posts', feedType],
		queryFn: async () => {
			const res = await fetch(POST_ENDPOINT);
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			return res.json();
		},
		keepPreviousData: true,
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch]);

	return (
		<>
			{(isLoading || isFetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isFetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isFetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};

export default Posts;
