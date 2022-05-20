function calcGravity(a, b) {
  const G = 1
  const dis = calcDis(a,b)
  if (dis < a.r || dis < b.r) return 0
  return a.m * b.m * G / Math.pow(dis, 2)
}

function calcDis(a, b) {
  return Math.hypot((b.x - a.x), (b.y - a.y))
}

function calcAngle(a, b) {
  return Math.atan2((b.x - a.x), (b.y - a.y))
}