<!-- 锚点文本设置 -->
<template>
	<el-Dialog :visible.sync="visibleModel" @close="close" :size="size" width="1260px" destroy-on-close append-to-body :close-on-click-modal="false" class="anchorDialog">
		<div class="head" slot="title">
			<span class="txt"> 锚点文本设置 </span>
			<span class="name"> {{ anchorObj.name }} （{{ anchorObj.classCode || anchorObj.typeCode }}） </span>
			<span class="tips">已自动保存</span>
		</div>
		<div class="steps">
			<span class="tips">操作提示：</span>
			<span class="step">
				<span class="icon">1</span>
				<span class="txt">选择要设置的点</span>
			</span>
			<span class="line"></span>
			<span class="step">
				<span class="icon">2</span>
				<span class="txt">选择连接的设备</span>
			</span>
			<span class="line"></span>
			<span class="step">
				<span class="icon">3</span>
				<span class="txt">添加【连接设备】锚点</span>
			</span>
			<span class="line"></span>
			<span class="step">
				<span class="icon">4</span>
				<span class="txt">设置【连接设备】锚点</span>
			</span>
		</div>
		<div class="anchor">
			<div class="container">
				<div class="Left">
					<div class="title">
						<span class="name"> 选择锚点 </span>
					</div>
					<div class="chartBox">
						<!-- 还未传参  数据请求参数目前写死在组件中  :texts="anchors_textList"-->
						<legend-choose :queryBody="anchorObj" @mainAnchor="getMainAnchor" :anchors_textline_data="anchors_textline_data" v-if="objectType != 'pipe'"></legend-choose>
						<stand-pipe-choose @mainAnchor="getMainAnchor" :stand_pipe_data="pipe_lineListMap" v-if="objectType == 'pipe'"></stand-pipe-choose>

						<div class="prompt" v-if="objectType != 'pipe'">
							<svg width="204" height="26" viewBox="0 0 204 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.556 7.244V8.888H13.524V9.728H17.556V11.852H12.804V12.692H16.776C15.912 14.336 14.52 15.68 12.6 16.736L13.092 17.54C15.132 16.268 16.584 14.66 17.448 12.692H17.556V18.164H18.444V12.692H18.54C19.332 14.468 20.76 16.064 22.8 17.504L23.4 16.736C21.432 15.548 20.04 14.204 19.236 12.692H23.196V11.852H18.444V9.728H22.56V8.888H18.444V7.244H17.556ZM25.932 7.424L25.332 7.988C26.148 8.624 26.784 9.224 27.252 9.8L27.84 9.2C27.324 8.612 26.688 8.024 25.932 7.424ZM24.54 10.892V11.72H26.208V16.472C26.208 16.664 26.112 16.844 25.944 17.012L26.28 17.78C27.12 17.228 27.924 16.604 28.68 15.896L28.44 14.984C27.948 15.452 27.48 15.86 27.048 16.22V10.892H24.54ZM28.8 12.296V13.136H29.46C29.796 14.18 30.408 15.116 31.32 15.956C30.42 16.592 29.304 17.108 27.972 17.504L28.452 18.236C29.856 17.804 31.044 17.24 32.004 16.52C32.844 17.168 33.9 17.732 35.148 18.236L35.616 17.492C34.44 17.06 33.444 16.568 32.628 16.004C33.504 15.188 34.128 14.216 34.512 13.088V12.296H28.8ZM30.276 13.136H33.66C33.276 14.024 32.7 14.792 31.932 15.464C31.14 14.78 30.588 14 30.276 13.136ZM29.724 7.664V8.996C29.724 9.944 29.196 10.676 28.152 11.192L28.728 11.852C29.952 11.156 30.576 10.172 30.576 8.9V8.48H32.904V10.436C32.904 11.144 33.264 11.504 34.008 11.504H35.328V10.712H34.224C33.912 10.712 33.756 10.556 33.756 10.256V7.664H29.724ZM36.852 10.592V11.252H41.424C41.376 11.48 41.34 11.708 41.292 11.936H38.376V17.228H36.636V17.924H47.376V17.228H45.636V11.936H42.156C42.204 11.72 42.24 11.492 42.288 11.252H47.16V10.592H42.384L42.456 9.896H46.344V7.652H37.656V9.896H41.592L41.52 10.592H36.852ZM39.216 17.228V16.436H44.784V17.228H39.216ZM39.216 15.896V15.14H44.784V15.896H39.216ZM39.216 14.588V13.832H44.784V14.588H39.216ZM39.216 13.292V12.536H44.784V13.292H39.216ZM45.528 9.284H43.74V8.288H45.528V9.284ZM42.948 9.284H41.052V8.288H42.948V9.284ZM40.272 9.284H38.484V8.288H40.272V9.284Z" fill="black" />
								<path d="M181.512 7.388L180.924 7.952C181.776 8.624 182.448 9.26 182.94 9.86L183.54 9.26C182.988 8.636 182.316 8.012 181.512 7.388ZM188.484 17.984H191.268L191.484 17.12C191.16 17.144 190.704 17.156 190.128 17.168C189.528 17.18 188.94 17.192 188.364 17.192C187.428 17.192 186.636 17.18 186.012 17.168C185.292 17.144 184.752 17.048 184.38 16.88C184.044 16.724 183.732 16.472 183.444 16.124C183.348 16.016 183.252 15.92 183.156 15.848V11.36H180.648V12.152H182.352V15.8C181.848 16.016 181.284 16.64 180.636 17.66L181.284 18.248C181.956 17.12 182.436 16.568 182.736 16.568C182.88 16.568 183.036 16.664 183.204 16.868C183.576 17.3 183.996 17.6 184.464 17.744C184.944 17.876 185.58 17.948 186.348 17.96C187.116 17.972 187.836 17.984 188.484 17.984ZM187.452 7.16V8.696H185.868C186.012 8.312 186.144 7.916 186.264 7.496L185.436 7.328C185.148 8.408 184.68 9.404 184.032 10.304L184.788 10.772C185.052 10.388 185.292 9.98 185.508 9.524H187.452V11.24H184.332V12.08H186.264C186.228 12.824 186.108 13.472 185.904 14C185.592 14.72 184.956 15.32 183.984 15.8L184.548 16.484C185.676 15.896 186.408 15.14 186.72 14.228C186.924 13.628 187.044 12.908 187.08 12.08H188.292V15.488C188.292 15.752 188.364 15.968 188.532 16.136C188.688 16.304 188.916 16.388 189.228 16.388H190.092C190.5 16.376 190.788 16.28 190.956 16.112C191.136 15.92 191.268 15.332 191.34 14.336L190.584 14.084C190.536 14.936 190.44 15.416 190.296 15.524C190.2 15.596 190.08 15.632 189.912 15.632H189.48C189.216 15.632 189.096 15.512 189.096 15.296V12.08H191.112V11.24H188.292V9.524H190.692V8.696H188.292V7.16H187.452ZM197.556 7.148V9.308H193.26V14.948H194.124V14.192H197.556V18.284H198.444V14.192H201.888V14.948H202.752V9.308H198.444V7.148H197.556ZM194.124 13.352V10.148H197.556V13.352H194.124ZM198.444 13.352V10.148H201.888V13.352H198.444Z" fill="black" />
								<path d="M104.02 12.632V7.832H95.14V8.672H103.144V11.804H96.484V10.028H95.62V16.328C95.62 17.312 96.1 17.816 97.072 17.816H103.576C104.08 17.792 104.476 17.66 104.74 17.408C105.028 17.096 105.232 16.208 105.352 14.72L104.512 14.456C104.44 15.776 104.284 16.544 104.044 16.76C103.864 16.904 103.624 16.976 103.336 16.976H97.312C96.76 16.976 96.484 16.7 96.484 16.172V12.632H104.02ZM107.932 7.424L107.332 7.988C108.148 8.624 108.784 9.224 109.252 9.8L109.84 9.2C109.324 8.612 108.688 8.024 107.932 7.424ZM106.54 10.892V11.72H108.208V16.472C108.208 16.664 108.112 16.844 107.944 17.012L108.28 17.78C109.12 17.228 109.924 16.604 110.68 15.896L110.44 14.984C109.948 15.452 109.48 15.86 109.048 16.22V10.892H106.54ZM110.8 12.296V13.136H111.46C111.796 14.18 112.408 15.116 113.32 15.956C112.42 16.592 111.304 17.108 109.972 17.504L110.452 18.236C111.856 17.804 113.044 17.24 114.004 16.52C114.844 17.168 115.9 17.732 117.148 18.236L117.616 17.492C116.44 17.06 115.444 16.568 114.628 16.004C115.504 15.188 116.128 14.216 116.512 13.088V12.296H110.8ZM112.276 13.136H115.66C115.276 14.024 114.7 14.792 113.932 15.464C113.14 14.78 112.588 14 112.276 13.136ZM111.724 7.664V8.996C111.724 9.944 111.196 10.676 110.152 11.192L110.728 11.852C111.952 11.156 112.576 10.172 112.576 8.9V8.48H114.904V10.436C114.904 11.144 115.264 11.504 116.008 11.504H117.328V10.712H116.224C115.912 10.712 115.756 10.556 115.756 10.256V7.664H111.724ZM118.852 10.592V11.252H123.424C123.376 11.48 123.34 11.708 123.292 11.936H120.376V17.228H118.636V17.924H129.376V17.228H127.636V11.936H124.156C124.204 11.72 124.24 11.492 124.288 11.252H129.16V10.592H124.384L124.456 9.896H128.344V7.652H119.656V9.896H123.592L123.52 10.592H118.852ZM121.216 17.228V16.436H126.784V17.228H121.216ZM121.216 15.896V15.14H126.784V15.896H121.216ZM121.216 14.588V13.832H126.784V14.588H121.216ZM121.216 13.292V12.536H126.784V13.292H121.216ZM127.528 9.284H125.74V8.288H127.528V9.284ZM124.948 9.284H123.052V8.288H124.948V9.284ZM122.272 9.284H120.484V8.288H122.272V9.284Z" fill="black" />
								<rect x="0.5" y="9.5" width="7" height="7" rx="3.5" fill="white" stroke="#246FE5" />
								<rect x="168" y="9" width="8" height="8" rx="4" fill="#246FE5" />
								<rect x="82" y="9" width="8" height="8" rx="4" fill="#CBF7F3" />
							</svg>
						</div>

						<div class="prompt" v-if="objectType == 'pipe'">
							<svg width="204" height="26" viewBox="0 0 204 26" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.556 7.244V8.888H13.524V9.728H17.556V11.852H12.804V12.692H16.776C15.912 14.336 14.52 15.68 12.6 16.736L13.092 17.54C15.132 16.268 16.584 14.66 17.448 12.692H17.556V18.164H18.444V12.692H18.54C19.332 14.468 20.76 16.064 22.8 17.504L23.4 16.736C21.432 15.548 20.04 14.204 19.236 12.692H23.196V11.852H18.444V9.728H22.56V8.888H18.444V7.244H17.556ZM25.932 7.424L25.332 7.988C26.148 8.624 26.784 9.224 27.252 9.8L27.84 9.2C27.324 8.612 26.688 8.024 25.932 7.424ZM24.54 10.892V11.72H26.208V16.472C26.208 16.664 26.112 16.844 25.944 17.012L26.28 17.78C27.12 17.228 27.924 16.604 28.68 15.896L28.44 14.984C27.948 15.452 27.48 15.86 27.048 16.22V10.892H24.54ZM28.8 12.296V13.136H29.46C29.796 14.18 30.408 15.116 31.32 15.956C30.42 16.592 29.304 17.108 27.972 17.504L28.452 18.236C29.856 17.804 31.044 17.24 32.004 16.52C32.844 17.168 33.9 17.732 35.148 18.236L35.616 17.492C34.44 17.06 33.444 16.568 32.628 16.004C33.504 15.188 34.128 14.216 34.512 13.088V12.296H28.8ZM30.276 13.136H33.66C33.276 14.024 32.7 14.792 31.932 15.464C31.14 14.78 30.588 14 30.276 13.136ZM29.724 7.664V8.996C29.724 9.944 29.196 10.676 28.152 11.192L28.728 11.852C29.952 11.156 30.576 10.172 30.576 8.9V8.48H32.904V10.436C32.904 11.144 33.264 11.504 34.008 11.504H35.328V10.712H34.224C33.912 10.712 33.756 10.556 33.756 10.256V7.664H29.724ZM36.852 10.592V11.252H41.424C41.376 11.48 41.34 11.708 41.292 11.936H38.376V17.228H36.636V17.924H47.376V17.228H45.636V11.936H42.156C42.204 11.72 42.24 11.492 42.288 11.252H47.16V10.592H42.384L42.456 9.896H46.344V7.652H37.656V9.896H41.592L41.52 10.592H36.852ZM39.216 17.228V16.436H44.784V17.228H39.216ZM39.216 15.896V15.14H44.784V15.896H39.216ZM39.216 14.588V13.832H44.784V14.588H39.216ZM39.216 13.292V12.536H44.784V13.292H39.216ZM45.528 9.284H43.74V8.288H45.528V9.284ZM42.948 9.284H41.052V8.288H42.948V9.284ZM40.272 9.284H38.484V8.288H40.272V9.284Z" fill="black" />
								<path d="M181.512 7.388L180.924 7.952C181.776 8.624 182.448 9.26 182.94 9.86L183.54 9.26C182.988 8.636 182.316 8.012 181.512 7.388ZM188.484 17.984H191.268L191.484 17.12C191.16 17.144 190.704 17.156 190.128 17.168C189.528 17.18 188.94 17.192 188.364 17.192C187.428 17.192 186.636 17.18 186.012 17.168C185.292 17.144 184.752 17.048 184.38 16.88C184.044 16.724 183.732 16.472 183.444 16.124C183.348 16.016 183.252 15.92 183.156 15.848V11.36H180.648V12.152H182.352V15.8C181.848 16.016 181.284 16.64 180.636 17.66L181.284 18.248C181.956 17.12 182.436 16.568 182.736 16.568C182.88 16.568 183.036 16.664 183.204 16.868C183.576 17.3 183.996 17.6 184.464 17.744C184.944 17.876 185.58 17.948 186.348 17.96C187.116 17.972 187.836 17.984 188.484 17.984ZM187.452 7.16V8.696H185.868C186.012 8.312 186.144 7.916 186.264 7.496L185.436 7.328C185.148 8.408 184.68 9.404 184.032 10.304L184.788 10.772C185.052 10.388 185.292 9.98 185.508 9.524H187.452V11.24H184.332V12.08H186.264C186.228 12.824 186.108 13.472 185.904 14C185.592 14.72 184.956 15.32 183.984 15.8L184.548 16.484C185.676 15.896 186.408 15.14 186.72 14.228C186.924 13.628 187.044 12.908 187.08 12.08H188.292V15.488C188.292 15.752 188.364 15.968 188.532 16.136C188.688 16.304 188.916 16.388 189.228 16.388H190.092C190.5 16.376 190.788 16.28 190.956 16.112C191.136 15.92 191.268 15.332 191.34 14.336L190.584 14.084C190.536 14.936 190.44 15.416 190.296 15.524C190.2 15.596 190.08 15.632 189.912 15.632H189.48C189.216 15.632 189.096 15.512 189.096 15.296V12.08H191.112V11.24H188.292V9.524H190.692V8.696H188.292V7.16H187.452ZM197.556 7.148V9.308H193.26V14.948H194.124V14.192H197.556V18.284H198.444V14.192H201.888V14.948H202.752V9.308H198.444V7.148H197.556ZM194.124 13.352V10.148H197.556V13.352H194.124ZM198.444 13.352V10.148H201.888V13.352H198.444Z" fill="black" />
								<path d="M104.02 12.632V7.832H95.14V8.672H103.144V11.804H96.484V10.028H95.62V16.328C95.62 17.312 96.1 17.816 97.072 17.816H103.576C104.08 17.792 104.476 17.66 104.74 17.408C105.028 17.096 105.232 16.208 105.352 14.72L104.512 14.456C104.44 15.776 104.284 16.544 104.044 16.76C103.864 16.904 103.624 16.976 103.336 16.976H97.312C96.76 16.976 96.484 16.7 96.484 16.172V12.632H104.02ZM107.932 7.424L107.332 7.988C108.148 8.624 108.784 9.224 109.252 9.8L109.84 9.2C109.324 8.612 108.688 8.024 107.932 7.424ZM106.54 10.892V11.72H108.208V16.472C108.208 16.664 108.112 16.844 107.944 17.012L108.28 17.78C109.12 17.228 109.924 16.604 110.68 15.896L110.44 14.984C109.948 15.452 109.48 15.86 109.048 16.22V10.892H106.54ZM110.8 12.296V13.136H111.46C111.796 14.18 112.408 15.116 113.32 15.956C112.42 16.592 111.304 17.108 109.972 17.504L110.452 18.236C111.856 17.804 113.044 17.24 114.004 16.52C114.844 17.168 115.9 17.732 117.148 18.236L117.616 17.492C116.44 17.06 115.444 16.568 114.628 16.004C115.504 15.188 116.128 14.216 116.512 13.088V12.296H110.8ZM112.276 13.136H115.66C115.276 14.024 114.7 14.792 113.932 15.464C113.14 14.78 112.588 14 112.276 13.136ZM111.724 7.664V8.996C111.724 9.944 111.196 10.676 110.152 11.192L110.728 11.852C111.952 11.156 112.576 10.172 112.576 8.9V8.48H114.904V10.436C114.904 11.144 115.264 11.504 116.008 11.504H117.328V10.712H116.224C115.912 10.712 115.756 10.556 115.756 10.256V7.664H111.724ZM118.852 10.592V11.252H123.424C123.376 11.48 123.34 11.708 123.292 11.936H120.376V17.228H118.636V17.924H129.376V17.228H127.636V11.936H124.156C124.204 11.72 124.24 11.492 124.288 11.252H129.16V10.592H124.384L124.456 9.896H128.344V7.652H119.656V9.896H123.592L123.52 10.592H118.852ZM121.216 17.228V16.436H126.784V17.228H121.216ZM121.216 15.896V15.14H126.784V15.896H121.216ZM121.216 14.588V13.832H126.784V14.588H121.216ZM121.216 13.292V12.536H126.784V13.292H121.216ZM127.528 9.284H125.74V8.288H127.528V9.284ZM124.948 9.284H123.052V8.288H124.948V9.284ZM122.272 9.284H120.484V8.288H122.272V9.284Z" fill="black" />
								<rect y="9" width="8" height="8" rx="1" fill="#D9EBFF" />
								<rect x="168" y="9" width="8" height="8" rx="1" fill="#246FE5" />
								<rect x="82" y="9" width="8" height="8" rx="1" fill="#CBF7F3" />
							</svg>
						</div>

						<div class="eqName">{{ anchorObj.name }}</div>
					</div>
					<!-- {{ pipe_lineListMap }} -->
				</div>
				<div class="equipmentBox">
					<div class="title">
						<span class="name"> 锚点链接设备 </span>
						<el-Button type="primary" icon="el-icon-plus" size="mini" @click="addEquipmentFun">新增设备</el-Button>
					</div>
					<div class="equipmentList">
						<el-Tree v-if="anchorList.length" class="filter-tree" :data="anchorList" :props="defaultProps" :filter-node-method="filterNode" ref="tree" highlight-current @node-click="changeTreeNode" :default-expanded-keys="defaultkeyarr" @node-expand="fnnodepand" node-key="classCode" default-expand-all>
							<template slot-scope="{ node, data }">
								<div class="treeHead" v-if="data.anchors" @click="editChangedAnchor = {}">
									<div class="label">
										<span class="name">{{ node.label }}</span>
										<span class="count" v-if="data.anchors"> 锚点数量：{{ data.anchors.length }} </span>
									</div>
									<div class="btn">
										<i class="icon el-icon-plus" title="新增锚点" @click="addEquipAnchor(data)"></i>
										<!-- <i class="icon el-icon-close" @click="delEquip(node,data)"></i> -->
									</div>
								</div>
								<div class="treeHead" v-else @click="editEquipAnchor(node, data)">
									<div class="label">
										<span class="name">锚点 {{ data.code || data.typeName }}</span>
										<span class="relation">{{ data.rel }}</span>
									</div>
									<div class="btn">
										<i class="icon el-icon-edit"></i>
										<i class="icon el-icon-close" @click.stop="delEquipAnchor(node, data)"></i>
									</div>
								</div>
							</template>
						</el-Tree>

						<div v-else class="noMore">
							<img src="@/assets/images/no_template.png" alt="" />
							<p>暂无连接设备</p>
						</div>
					</div>
				</div>
				<div class="anchorBox">
					<template v-if="JSON.stringify(editChangedAnchor) != '{}'">
						<div class="title">
							<span class="name"> 编辑锚点 </span>
						</div>
						<div class="chartBox">
							<legend-anchor-edit v-if="JSON.stringify(editEqAnchorObj) != '{}' && changedType == 'text-line'" :queryBody="editEqAnchorObj" :editChangedAnchor="editChangedAnchor" @changeNewAnchor="replaceAnchor"></legend-anchor-edit>
							<stand-pipe-edit v-if="JSON.stringify(editEqAnchorObj) != '{}' && changedType == 'pipe-line'" :riserName="editEqAnchorObj.name" :queryBody="editEqAnchorObj" :editChangedAnchor="editChangedAnchor" @changeNewAnchor="replaceAnchor"></stand-pipe-edit>
							<!-- {{  editEqAnchorObj }} -->
							<div class="eqName">{{ editEqAnchorObj.name }}</div>
						</div>
						<div class="gx">
							<span>选择关系</span>
							<el-button type="text" :disabled="relClassCodeList.length ? true : false" @click="visIndirect">{{ indirectOptions.length ? "编辑关系" : "＋ 间接关系" }}</el-button>
						</div>
						<el-Cascader ref="relCascader" :disabled="relClassCodeList.length ? false : true" :options="relClassCodeList" @change="changeRelClassCode" v-model="defaultRCCModel">
							<!-- <template slot-scope="{ node, data }">
                                <span v-if="node.children">{{ data.graphCode }}</span>
                                <span v-else> {{ data }} </span>
                                </template> -->
						</el-Cascader>
						<div class="gx">
							<span>关系方向</span>
						</div>
					</template>
					<div v-else class="noMore">
						<img src="@/assets/images/no_template.png" alt="" />
						<p>暂无锚点</p>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer">
			<el-Button size="small" @click="cancel">取 消</el-Button>
			<el-Button size="small" type="primary" @click="confirm">确定</el-Button>
		</div>
		<el-Drawer title="锚点链接设备" :visible.sync="drawerVisible" :modal="false"></el-Drawer>
		<addDevice :key="JSON.stringify(addDeviceVisible)" :visible.sync="addDeviceVisible" :equipList="equipList" :anchorList="anchorList" @CheckedEquipment="changeEquipment"></addDevice>

		<!-- {{ equipList }} -->
		<!-- 
        <br />
        {{ anchorList }} -->

		<el-Dialog title="新增锚点" :visible.sync="addAnchorVisible" v-if="addAnchorVisible" width="292px" append-to-body :destroy-on-close="true" :close-on-click-modal="false">
			<div class="add_Anchor">
				<legend-anchor-set ref="legend_anchor_set" v-if="addEqAnchorObj.typeCode != 'pipe'" :queryBody="addEqAnchorObj" :addChangedAnchor.sync="addChangedAnchor"></legend-anchor-set>
				<stand-pipe-set ref="stand_pipe_set" v-if="addEqAnchorObj.typeCode == 'pipe'" :riserName="addEqAnchorObj.name" :equipList="equipList" :queryBody="addEqAnchorObj" :addChangedAnchor.sync="addChangedAnchor"></stand-pipe-set>
				<div class="eqName">{{ addEqAnchorObj.name }}</div>
			</div>
			<div slot="footer">
				<el-Button size="small" @click="addAnchorCenter">取 消</el-Button>
				<el-Button size="small" type="primary" @click="addAnchorSure">确定</el-Button>
			</div>
		</el-Dialog>

		<to-indirect :visible.sync="indirectVisible" :options="indirectOptions" @confirm="getIndirect"></to-indirect>
	</el-Dialog>
</template>

<script>
/**
 * props
 *   visible - <Boolean>  对话框显隐
 * Event
 *   close 关闭的回调事件
 */
import addDevice from "./addDevice.vue";
import LegendChoose from "@/components/legendChoose.vue";
import LegendAnchorSet from "@/components/legendAnchorSet.vue";
import LegendAnchorEdit from "@/components/legendAnchorEdit.vue";
import GetAdmData from "@/store/http/getAdmData";
import ToIndirect from "@/components/template/toIndirect.vue";
import StandPipeChoose from "@/components/standPipeChoose.vue";
import StandPipeEdit from "@/components/standPipeEdit.vue";
import StandPipeSet from "@/components/standPipeSet.vue";

const testData = require("./test.json");

const initAnchor = () => ({
	id: "",
	equipment: "",
	anchor: "",
	relationship: "",
	direction: "",
});
export default {
	props: {
		visible: {
			type: Boolean,
			default: () => true,
		},
		// 设备列表 ， 中间需包含 锚点信息
		equipObject: {
			type: Object,
		},
		objectType: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			pipe_lineListMap: [],

			anchors_lineListMap: [],
			anchors_textline_data: {},
			// 编辑状态 - true-add   false-edit
			editState: true,
			defaultkeyarr: [], // 默认展开的数组
			// 添加设备弹窗
			addDeviceVisible: false,
			drawerVisible: false,
			indirectVisible: false,
			indirectOptions: [],
			// 添加锚点
			addAnchorVisible: false,

			title: "锚点文本设置",
			size: "small",
			defaultProps: {
				children: "anchors",
				label: "name",
			},

			mainAnchor: {},
			templateId: "",
			equipList: [],
			anchorObj: {},
			anchorList: [],

			// true 选中的设备 - 用于添加锚点
			addEqAnchorObj: {},
			// 已选中的锚点
			addChangedAnchor: {},
			// 从 tree  已选中的锚点
			changeTreeAnchor: {},

			editEqAnchorObj: {},
			editChangedAnchor: {},

			// 关系列表
			relClassCodeList: [],
			defaultRCCModel: [],

			changedType: "", //选择类型，右侧面板显示谁
		};
	},
	components: {
		addDevice,
		LegendChoose,
		LegendAnchorSet,
		LegendAnchorEdit,
		ToIndirect,
		StandPipeChoose,
		StandPipeEdit,
		StandPipeSet,
	},
	computed: {
		visibleModel: {
			get() {
				if (this.visible) {
					// this.addAnchor();
				}
				return this.visible;
			},
			set(val) {
				this.$emit("update:visible", false);
			},
		},
	},
	watch: {
		equipObject: {
			deep: true,
			immediate: true,
			handler: function (val) {
				if (JSON.stringify(val) == "{}") return;

				let list = val?.list || [];
				let mList = val?.mainPipesList || [];
				let eqs = [];
				list.forEach((item) => {
					eqs.push({
						templateId: this.$route.query.templateid,
						operate: "text-line",
						containerId: item.id,
						classCode: item.classCodes[0],
						name: item.name,
						anchors: [],
						checked: false,
						typeCode: item.typeCode,
					});
				});

				mList.forEach((item) => {
					let obj = {
						...{ templateId: this.$route.query.templateid },
						...item,
						checked: false,
						anchors: [],
						typeCode: "pipe",
					};

					item.children.forEach((child) => {
						(child.checked = false), (child.checked1 = false);
						child.locked = false;
					});
					eqs.push(obj);
				});

				this.equipList = eqs;

				if (this.objectType == "pipe") {
					let pipe = val.info;
					this.pipe_lineListMap = {};

					this.$nextTick(() => {
						this.pipe_lineListMap = pipe;
						this.anchorObj = pipe;
					});
				} else {
					this.anchorObj = {
						templateId: this.$route.query.templateid,
						operate: "text-line",
						containerId: val.info.id,
						classCode: val.info.classCodes[0],
						name: val.info.name,
						anchors: [],
					};

					this.getAnchorsTexts(this.anchorObj);
				}
			},
		},
		visibleModel: {
			deep: true,
			immediate: true,
			handler: function (val) {},
		},
	},
	mounted() {
		const { templateid } = this.$route.query;
		this.templateId = templateid;
	},
	methods: {
		visIndirect() {
			this.indirectVisible = true;

			if (this.editChangedAnchor.relChain && this.editChangedAnchor.relChain.relChainList && this.editChangedAnchor.relChain.relChainList.length) {
				this.indirectOptions = this.editChangedAnchor.relChain.relChainList;
				return;
			}

			// 如果是新建则执行此方法
			if (this.editChangedAnchor.lineId == undefined || this.editChangedAnchor.lineId == "") {
				let opt = [];
				opt.push({
					relObjId: this.mainAnchor.classCode || this.anchorObj.classCode || this.mainAnchor.equipmentTypes[0] || this.anchorObj.equipmentTypes[0] || "",
					name: this.anchorObj.name,
					classCode: this.mainAnchor.classCode || this.anchorObj.classCode || this.mainAnchor.equipmentTypes[0] || this.anchorObj.equipmentTypes[0] || "",
					relationCode: "",
				});
				opt.push({
					relObjId: this.editEqAnchorObj?.classCode || this.editEqAnchorObj?.classCodes?.[0] || this.editEqAnchorObj?.equipmentTypes?.[0] || "",
					name: this.editEqAnchorObj.name,
					classCode: this.editEqAnchorObj?.classCode || this.editEqAnchorObj?.classCodes?.[0] || this.editEqAnchorObj?.equipmentTypes?.[0] || "",
					relationCode: "",
				});
				this.indirectOptions = opt;
			}
		},
		getIndirect(data) {
			let self = this;
			this.anchorList.forEach((item) => {
				if (item.containerId == self.editEqAnchorObj.containerId) {
					item.anchors.forEach((anchor) => {
						if (anchor.code == self.editChangedAnchor.code) {
							anchor["relChain"] = data;
							anchor["rel"] = "间接关系";
						}
					});
				}
			});
			this.anchorList = this.anchorList.concat([]);
		},
		addEquipmentFun() {
			if (JSON.stringify(this.mainAnchor) == "{}") {
				return this.$message.error("请先选择锚点");
			}
			this.addDeviceVisible = true;
		},
		async getMainAnchor(marker) {
			if (this.objectType == "pipe") {
				const params = {
					templateId: this.templateId,
					operate: "pipe-line",
					mainPipeId: marker.id,
				};

				await GetAdmData.getAnchorsTexts(params).then((result) => {
					if (result && result.result == "success" && result.data.success != false) {
						let line = result.data.lineList;
						this.anchorList = [];
						this.editChangedAnchor = {};
						this.defaultRCCModel = [];
						let arr = [];

						if (line != undefined && line.length) {
							line.forEach((item) => {
								let relChain = {
									relationName: "",
								};

								if (item.classCodeList.length > 2) {
									let relList = [];
									for (let i = 0; i < item.classCodeList.length; i++) {
										relList.push({
											relObjId: item.classCodeList[i],
											name: item.relChainFilter[i].name,
											objType: undefined,
											classCode: item.classCodeList[i],
											relationCode: item.relTypeList[i - 1]?.code,
										});
									}
									relChain["relChainList"] = relList;
								}

								let code = item.classCodeList[item.classCodeList.length - 1];
								let lst = this.equipObject.list.filter((x) => x.classCodes[0] == code);
								lst = lst.concat(this.equipObject.mainPipesList.filter((x) => x.classCodes[0] == code || x.classCodes[1] == code));
								if (lst.length) {
									let eq = {
										templateId: this.$route.query.templateid,
										operate: "pipe-line",
										containerId: lst[0].id,
										classCode: lst[0].classCodes[0],
										name: lst[0].name,
										checked: true,
										typeCode: "pipe",
										relTypeList: item.relTypeList,
										matchFiltersList: item.matchFiltersList,
										classCodeList: item.classCodeList,
										id: item.id,
										anchors: [
											{
												code: item.templateConnector2.anchorCode,
												mainPipeId: item.templateConnector2.mainPipeId,
												multiple: false,
												rel: item.relTypeList.length > 1 ? "间接关系" : item.relTypeList[0].name,
												relCode: item.relTypeList[0].code,
												lineId: item.id,
												relChain: relChain,
												checked: true,
												visible: true,
												locked: true,
												lineId: item.id,
												fatherId: lst[0].id,
											},
										],
									};

									arr.push(eq);
								}
							});

							let lst = _.uniqBy(arr, "classCode");
							for (let i = 0; i < lst.length; i++) {
								let eqs = arr.filter((x) => x.classCode == lst[i].classCode);
								for (let j = 0; j < eqs.length; j++) {
									if (eqs[j].id !== lst[i].id) {
										lst[i].anchors.push(eqs[j].anchors[0]);
									}
								}
							}

							this.anchorList = lst;
						} else {
							this.anchorList = [];
						}
					}
				});

				return (this.mainAnchor = marker);
			} else {
				let line = this.anchors_lineListMap[marker.code];
				this.anchorList = [];
				this.editChangedAnchor = {};
				this.defaultRCCModel = [];
				let arr = [];

				if (line != undefined && line.length) {
					line.forEach((item) => {
						let relChain = {
							relationName: "",
						};
						if (item.classCodeList.length > 2) {
							let relList = [];
							for (let i = 0; i < item.classCodeList.length; i++) {
								relList.push({
									relObjId: item.classCodeList[i],
									name: item.relChainFilter[i].name,
									objType: undefined,
									classCode: item.classCodeList[i],
									relationCode: item.relTypeList[i - 1]?.code,
								});
							}
							relChain["relChainList"] = relList;
						}

						let code = item.classCodeList[item.classCodeList.length - 1];
						let lst = this.equipObject.list.filter((x) => x.classCodes[0] == code);
						lst = lst.concat(this.equipObject.mainPipesList.filter((x) => x.classCodes[0] == code || x.classCodes[1] == code));

						if (lst.length) {
							let eq = {
								templateId: this.$route.query.templateid,
								operate: "text-line",
								containerId: lst[0].id,
								classCode: lst[0].classCodes[0],
								name: lst[0].name,
								relTypeList: item.relTypeList,
								matchFiltersList: item.matchFiltersList,
								classCodeList: item.classCodeList,
								id: item.id,
								anchors: [
									{
										code: item.templateConnector2.anchorCode,
										multiple: false,
										rel: item.relTypeList.length > 1 ? "间接关系" : item.relTypeList[0].name,
										relCode: item.relTypeList[0].code,
										lineId: item.id,
										relChain: relChain,
										checked: true,
										visible: true,
										locked: false,
										lineId: item.id,
									},
								],
							};

							arr.push(eq);
						}
					});

					// 去重
					let lst = _.uniqBy(arr, "classCode");
					for (let i = 0; i < lst.length; i++) {
						let eqs = arr.filter((x) => x.classCode == lst[i].classCode);
						for (let j = 0; j < eqs.length; j++) {
							if (eqs[j].id !== lst[i].id) {
								lst[i].anchors.push(eqs[j].anchors[0]);
							}
						}
					}

					this.anchorList = lst;
				} else {
					this.anchorList = [];
				}

				this.mainAnchor = marker;
			}
		},
		fnnodepand(node) {
			this.defaultkeyarr.push(node.classCode);
		},
		addAnchor() {
			const anchor = initAnchor();
			anchor.id = Math.random();
			this.anchorList.push(anchor);
		},
		del(id) {
			const index = this.anchorList.findIndex((item) => item.id === id);
			this.anchorList.splice(index, 1);
		},
		close() {
			this.$emit("update:visible", false);
		},
		cancel() {
			this.close();
			this.$nextTick(() => {
				//初始化数据
				this.anchorList = [];
			});
		},
		confirm() {
			this.anchorsModify();
		},
		// 编辑锚点联线
		async anchorsModify() {
			if (JSON.stringify(this.mainAnchor) == "{}") {
				return this.$message.error("请选择锚点");
			}
			if (!this.anchorList.length) {
				return this.$message.error("请添加要链接的设备");
			}

			let self = this;
			let jump = false;
			let listParam = [];

			// 循环已加入设备
			this.anchorList.forEach((item) => {
				if (jump) return;

				item.anchors.forEach((anchor) => {
					if (jump) return;

					let tc1 = {};

					if (this.objectType == "pipe") {
						tc1 = {
							mainPipeId: self.mainAnchor.id,
						};
					} else {
						tc1 = {
							containerId: self.mainAnchor.containerId,
							anchorCode: self.mainAnchor.code,
						};
					}

					let tc2 = {};
					if (item.typeCode == "pipe" && anchor.code == undefined) {
						tc2 = {
							mainPipeId: anchor.mainPipeId || anchor.id,
						};
					} else {
						tc2 = {
							containerId: item.containerId,
							anchorCode: anchor.code,
						};
					}

					let classCodeList = [];
					let matchFiltersList = []; // 如果没有过滤条件  那就传 [[],[],[]]
					let relChainFilter = [];
					let relTypeList = [];

					if (anchor.relChain && anchor.relChain.relChainList) {
						for (let i = 0; i < anchor.relChain.relChainList.length; i++) {
							const element = anchor.relChain.relChainList[i];
							classCodeList.push(element.classCode || element.equipmentTypes[0]);

							matchFiltersList.push([]);

							if (i == 0) {
								relChainFilter.push({
									relObjType: this.objectType == "pipe" ? "dynVar" : "container",
									relObjId: self.mainAnchor.containerId || self.mainAnchor.fatherId,
									classCode: self.mainAnchor.classCode || self.mainAnchor.equipmentTypes[0],
								});
							} else if (i == anchor.relChain.relChainList.length - 1) {
								relChainFilter.push({
									relObjType: item.typeCode == "pipe" ? "dynVar" : "container",
									relObjId: item.containerId || anchor.fatherId,
									classCode: item.classCode || anchor.equipmentTypes[0],
								});
							} else {
								relChainFilter.push({
									relObjType: "object",
									relObjId: element.classCode,
									classCode: element.classCode,
								});
							}

							if ((element.relationCode && element.relationCode != "") || anchor.rel == "间接关系") {
								if (anchor.rel == "间接关系" && i == 0) {
									continue;
								} else {
									relTypeList.push({
										code: element.relationCode,
										name: element.name,
									});
								}
							} else {
								jump = true;
								return this.$message.error("锚点" + tc2.anchorCode + "未选择关系");
							}
						}
					} else {
						classCodeList.push(self.mainAnchor.classCode || self.mainAnchor.equipmentTypes[0]);
						classCodeList.push(item.classCode || anchor.equipmentTypes[0]);

						matchFiltersList = [[], []];

						relChainFilter.push({
							relObjType: this.objectType == "pipe" ? "dynVar" : "container",
							relObjId: self.mainAnchor.containerId || self.mainAnchor.fatherId,
							classCode: self.mainAnchor.classCode || self.mainAnchor.equipmentTypes[0],
						});
						relChainFilter.push({
							relObjType: item.typeCode == "pipe" ? "dynVar" : "container",
							relObjId: item.containerId || anchor.fatherId,
							classCode: item.classCode || anchor.equipmentTypes[0],
						});

						relTypeList.push({
							code: anchor.relCode,
							name: anchor.rel,
						});

						if (anchor.relCode == undefined || anchor.rel == undefined) {
							jump = true;
							return this.$message.error("有锚点或立管未选择关系");
						}
					}

					let params = {
						templateId: this.templateId,
						operate: "line_insert",
						containerId: this.mainAnchor.containerId,
						line: {
							templateConnector1: tc1,
							templateConnector2: tc2,
							classCodeList: classCodeList,
							matchFiltersList: matchFiltersList, // 链路上所有设备的过滤条件，包含起点终点
							relChainFilter: relChainFilter,
							relTypeList: relTypeList, //  链路上所有设备间关系，比设备数量少一个
						},
					};

					if (anchor.lineId && anchor.lineId != "") {
						params.operate = "line_update";
						params.line.id = anchor.lineId;
					}

					listParam.push(params);
				});
			});

			this.anchorList.forEach((item) => {
				let anchors = item.anchors;
				let repetition = _.uniqBy(anchors, "relCode");
				if (anchors.length != repetition.length) {
					jump = true;
					return this.$message.error(item.name + "下锚点不能有重复关系!");
				}
			});

			if (jump) return;

			let count = 0;
			for (let i = 0; i < listParam.length; i++) {
				const item = listParam[i];
				const { result, data } = await GetAdmData.anchorsModify(item);

				if (result == "success") {
					this.$message({
						message: "保存成功",
						type: "success",
					});
					count++;

					if (data.success == false) {
						this.$message.error("锚点" + item.line.templateConnector2.anchorCode + "设置错误," + data.error);
					}
				}
			}

			if (listParam.length == count) {
				this.close();
				this.$emit("close");
			}
		},
		// 查询锚点联线
		async getAnchorsTexts(params) {
			await GetAdmData.getAnchorsTexts(params).then((result) => {
				if (result.result == "success") {
					this.anchors_lineListMap = result.data.lineListMap;
					this.anchors_textline_data = result.data;
				}
			});
		},
		changeTreeNode() {},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		changeEquipment(eqs) {
			if (!this.anchorList.length) {
				this.anchorList = eqs.filter((x) => x.checked == true);
			} else {
				let eqChecked = eqs.filter((x) => x.checked == true);
				for (let i = 0; i < this.anchorList.length; i++) {
					let eq = this.anchorList[i];
					let idx = eqChecked.findIndex((x) => {
						return (x.containerId == eq.containerId && x.classCode == eq.classCode) || (x.typeCode == "pipe" && x.id == eq.containerId);
					});
					if (idx > -1) {
						eqChecked.splice(idx, 1);
					} else {
						// eqChecked[i] = this.anchorList[i]
						this.anchorList.splice(i, 1);
						i--;
					}
				}

				this.anchorList = [...this.anchorList, ...eqChecked];
			}
		},
		// 查询关系
		async getRelFromToClassCode() {
			let params = {
				classCodeFrom: this.mainAnchor.classCode || this.anchorObj.classCode || this.mainAnchor.equipmentTypes[0] || this.anchorObj.equipmentTypes[0] || "",
				classCodeTo: this.editEqAnchorObj?.classCode || this.editEqAnchorObj?.classCodes?.[0] || this.editEqAnchorObj?.equipmentTypes?.[0] || "",
			};
			if (this.editChangedAnchor?.compType == "mainPipe") {
				params.classCodeTo = this.editChangedAnchor.equipmentTypes[0];
			}

			await GetAdmData.getClassCode(params).then((result) => {
				if (result.result == "success") {
					let data = result.data;
					data.forEach((item) => {
						item["label"] = item.name;
						item["value"] = item.graphCode;

						item.children.forEach((child) => {
							child["label"] = child.name;
							child["value"] = child.relCode;
						});
					});
					this.relClassCodeList = data;
				}
			});
		},
		changeRelClassCode(data) {
			if (data.length == 2) {
				const relCode = data[0] + "/" + data[1];
				const label = this.$refs.relCascader.getCheckedNodes()[0].pathLabels[0] + "/" + this.$refs.relCascader.getCheckedNodes()[0].pathLabels[1];

				let code = this.editChangedAnchor.code || this.editChangedAnchor.id || this.editChangedAnchor.lineId;
				this.anchorList.forEach((item) => {
					item.anchors.forEach((anchor) => {
						if (anchor.code == code || anchor.id == code || anchor.lineId == code) {
							anchor["rel"] = label;
							anchor["relCode"] = relCode;
						}
					});
				});

				this.anchorList = this.anchorList.concat([]);
			}
		},
		// 添加锚点的弹出窗
		addEquipAnchor(data) {
			this.addAnchorVisible = true;
			this.addEqAnchorObj = data;
		},
		// 添加锚点 - 取消
		addAnchorCenter() {
			this.addAnchorVisible = false;
			this.addChangedAnchor = {};
		},
		// 添加锚点 - 确定
		async addAnchorSure() {
			this.addAnchorVisible = false;
			let list = this.addEqAnchorObj.typeCode == "pipe" ? await this.$refs.stand_pipe_set.getChangedAnchors() : this.$refs.legend_anchor_set.getChangedAnchors();
			// debugger
			list.forEach((item) => {
				this.addEqAnchorObj.anchors.push(item);
			});
			// this.addEqAnchorObj.anchors.push(this.addChangedAnchor)
		},
		delEquip(node, data) {
			this.anchorList = _.remove(this.anchorList, function (item) {
				return item.containerId !== data.containerId;
			});
			this.$nextTick(() => {
				this.anchorList = this.anchorList.concat([]);
			});
		},
		// 从tree  删除锚点
		delEquipAnchor(node, data) {
			// if (JSON.stringify(this.addEqAnchorObj) == '{}') {
			this.addEqAnchorObj = node.parent.data;
			// }
			let i = this.getIndexInArr(this.addEqAnchorObj.anchors, data);
			if (i !== -1 && this.addEqAnchorObj.typeCode != "pipe" && this.addEqAnchorObj.operate != "pipe-line") {
				this.addEqAnchorObj.anchors.splice(i, 1);
			} else if (this.addEqAnchorObj.typeCode == "pipe" && this.addEqAnchorObj.operate == "pipe-line") {
				this.addEqAnchorObj.anchors.forEach((element) => {
					if (element.lineId == data.lineId) {
						element.checked = false;
						element.checked1 = false;
						element.locked = false;
					}
				});
			}

			// 删除 anchorList 中的节点
			// let j = this.getIndexInArr(this.anchorList, data)
			// j !== -1 && this.anchorList[j].anchors.splice(i, 1)

			for (let i = 0; i < this.anchorList.length; i++) {
				let j = this.getIndexInArr(this.anchorList[i].anchors, data);
				j !== -1 && this.anchorList[i].anchors.splice(j, 1);
			}

			_.remove(this.anchors_lineListMap[this.mainAnchor.code], function (item) {
				return (item.id = data.lineId);
			});

			if (this.addEqAnchorObj.typeCode == "pipe") {
				this.addEqAnchorObj.children.forEach((element) => {
					if (element.id == data.id) {
						element.checked = false;
						element.checked1 = false;
						element.locked = false;
					}
				});
			}

			this.editChangedAnchor = {};
			this.defaultRCCModel = [];

			let params = {
				templateId: this.templateId,
				operate: "line_delete",
				containerId: this.mainAnchor.containerId,
				line: {
					id: data.lineId,
				},
			};

			GetAdmData.anchorsModify(params).then((result) => {
				if (result.result == "success") {
					this.$message({
						message: "删除成功",
						type: "success",
					});
				}
			});
		},
		// 从tree  编辑锚点
		editEquipAnchor(node, data) {
			if (JSON.stringify(this.mainAnchor) == "{}") {
				return this.$message.error("请先选择左侧锚点");
			}

			this.changedType = data.code ? "text-line" : "pipe-line";

			this.defaultRCCModel = [];
			if (node.parent.data.relTypeList && node.parent.data.relTypeList.length == 1) {
				this.defaultRCCModel = data?.relCode?.split("/"); //node.parent.data.relTypeList[0].code.split('/')
				this.indirectOptions = [];
			} else if (node.parent.data.relTypeList && node.parent.data.relTypeList.length > 1) {
				let io = [];
				for (let i = 0; i < node.parent.data.classCodeList.length; i++) {
					if (i == 0) {
						io.push({
							relObjId: node.parent.data.classCodeList[i],
							name: "",
							classCode: node.parent.data.classCodeList[i],
							relationCode: "",
						});
					} else {
						io.push({
							relObjId: node.parent.data.classCodeList[i],
							name: node.parent.data.relTypeList[i - 1].name,
							classCode: node.parent.data.classCodeList[i],
							relationCode: node.parent.data.relTypeList[i - 1].code,
						});
					}
				}

				this.indirectOptions = io;
			}

			this.editEqAnchorObj = {};
			this.editChangedAnchor = {};

			this.$nextTick(() => {
				this.editEqAnchorObj = node.parent.data;
				this.editChangedAnchor = data;

				let arr = this.equipList.filter((x) => x.id == this.editEqAnchorObj.containerId);
				if (arr && arr.length) this.editEqAnchorObj.children = arr[0].children;

				if (data.compType == "mainPipe") {
					let tmp = this.equipList.filter((x) => x.id == data.fatherId);
					if (tmp.length) {
						this.editEqAnchorObj = tmp[0];
					}

					this.editChangedAnchor = data;
				}

				// 获取关系列表
				this.getRelFromToClassCode();
			});
		},
		replaceAnchor(data) {
			let oCode = this.editChangedAnchor.code;
			let nCode = data.code;

			for (let i = 0; i < this.anchorList.length; i++) {
				let anchors = this.anchorList[i].anchors;

				for (let j = 0; j < anchors.length; j++) {
					if (anchors[j].code == oCode) {
						anchors[j] = _.assign(anchors[j], data);
						this.editChangedAnchor = anchors[j];
					}
				}
			}

			this.anchorList = this.anchorList.concat([]);
			// if(data.compType == 'mainPipe'){
			//            // 获取关系列表
			//            this.getRelFromToClassCode()
			// }
		},
		//从数组中获取对象的索引
		getIndexInArr(_arr, _obj) {
			var len = _arr.length;
			for (var i = 0; i < len; i++) {
				if (this.isObjectValueEqual(_arr[i], _obj)) {
					return i;
				}
			}
			return -1;
		},
		// 判断对象是否相等
		isObjectValueEqual(a, b) {
			if (typeof a != "object" && typeof b != "object") {
				if (a == b) {
					return true;
				} else {
					return false;
				}
			}
			var aProps = Object.getOwnPropertyNames(a);
			var bProps = Object.getOwnPropertyNames(b);

			if (aProps.length != bProps.length) {
				return false;
			}

			for (var i = 0; i < aProps.length; i++) {
				var propName = aProps[i];

				if (a[propName] !== b[propName]) {
					return false;
				}
			}

			return true;
		},
	},
};
</script>

<style lang="scss" scoped>
.anchorDialog {
	::v-deep {
		.el-dialog__header {
			padding: 0;
		}

		.el-dialog__body {
			padding: 0;
		}
	}
}

.head {
	font-size: 16px;
	font-weight: 700;
	border-bottom: 1px solid #e1e5eb;
	padding: 20px;

	.txt {
		color: #2e3742;
		border-right: 1px solid #c4c9cf;
		padding-right: 6px;
		margin-right: 8px;
	}

	.name {
		color: #246fe5;
	}

	.tips {
		font-size: 12px;
		color: #626c78;
		padding-left: 10px;
		font-weight: 400;
	}
}

.steps {
	display: flex;
	height: 40px;
	align-items: center;
	background: #f1f4f6;
	border-radius: 4px;
	margin: 10px 20px;
	padding: 0 15px;

	.tips {
		font-size: 14px;
		color: #1b2129;
		padding-right: 5px;
	}

	.step {
		display: flex;
		align-items: center;

		.icon {
			flex-shrink: 0;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #fff;
			margin-right: 5px;
			background: #246fe5;
		}

		.txt {
			font-size: 14px;
			color: #000000;
		}
	}

	.line {
		display: flex;
		flex-grow: 1;
		border-bottom: 1px dashed #c4c9cf;
		max-width: 80px;
		margin: 0 10px;
	}
}

.anchor {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	// background: #f7f9fa;
	border-bottom: 1px solid #e1e5eb;

	.container {
		display: flex;
		flex-grow: 1;

		.noMore {
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			color: #626c78;
			line-height: 22px;

			p {
				padding-top: 10px;
			}
		}

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;

			.name {
				padding-left: 5px;
				border-left: 2px solid #246fe5;
				font-weight: 700;
				color: #2e3742;
			}
		}

		.Left {
			width: 360px;
			height: 460px;
			// background: #f1f4f6;
			border-right: 1px solid #e1e5eb;
			padding: 17px 15px 0 20px;
			display: flex;
			flex-direction: column;

			.chartBox {
				background: #f7f9fa;
				border-radius: 8px;
				display: flex;
				flex-grow: 1;
				margin: 15px 0;
				position: relative;
			}

			.prompt {
				position: absolute;
				width: 298px;
				height: 34px;
				left: 12px;
				bottom: 10px;
				background: #ffffff;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.eqName {
				position: absolute;
				top: 8px;
				left: 14px;
				color: #626c78;
				font-weight: 700;
			}
		}

		.equipmentBox {
			width: 510px;
			padding: 10px 15px 0;
			display: flex;
			flex-grow: 1;
			flex-direction: column;

			.equipmentList {
				height: 0;
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				background: #fff;
				padding: 8px;
				box-sizing: border-box;
				overflow-y: auto;

				.treeHead {
					display: flex;
					flex-grow: 1;
					justify-content: space-between;
					align-items: center;

					.label {
						font-size: 14px;
						display: flex;
						align-items: center;

						.name {
							color: #1b2129;
							padding-right: 10px;
						}

						.count {
							padding: 0 5px;
							height: 18px;
							flex-shrink: 0;
							display: flex;
							font-size: 12px;
							color: #e68600;
							align-items: center;
							background: #fff0cc;
							border-radius: 2px;
						}

						.relation {
							padding: 0 5px;
							height: 18px;
							flex-shrink: 0;
							display: flex;
							font-size: 12px;
							color: #1b4acc;
							align-items: center;
							background: #d9ebff;
							border-radius: 2px;

							&.no {
								background: #edf1f5;
								color: #8b949e;
							}
						}
					}

					.btn {
						display: flex;
						align-items: center;

						.icon {
							padding: 0 5px;
							cursor: pointer;
						}
					}
				}
			}
		}

		.anchorBox {
			width: 360px;
			border-left: 1px solid #e1e5eb;
			padding: 17px 15px 0;
			box-sizing: border-box;

			.chartBox {
				height: 220px;
				background: #f7f9fa;
				border-radius: 8px;
				margin: 20px 0;
				display: flex;
				align-items: center;
				overflow: hidden;
				position: relative;

				.eqName {
					position: absolute;
					top: 8px;
					left: 14px;
					color: #626c78;
					font-weight: 700;
				}
			}

			.gx {
				color: #626c78;
				font-family: "Microsoft YaHei UI";
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				line-height: 22px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.el-cascader {
				width: 100%;
				margin-top: 4px;
				margin-bottom: 20px;
			}
		}
	}
}

.add_Anchor {
	display: flex;
	flex-grow: 1;
	height: 230px;
	align-items: center;
	overflow: hidden;
	position: relative;

	.eqName {
		position: absolute;
		top: 8px;
		left: 14px;
		color: #626c78;
		font-weight: 700;
	}
}

::v-deep .el-button--primary {
	padding: 9px 15px !important;
}
</style>
